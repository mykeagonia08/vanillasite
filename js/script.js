// Code for Dynamic 


window.onload = function() {

		
	// Show/hide mobile menu
	const navToggle = document.querySelector('#nav-toggle');
	const navMenu = document.querySelector('#nav-menu');
	navToggle.addEventListener('click', () => {
		navToggle.classList.toggle('active');
		navMenu.classList.toggle('active');
	});

	if (document.querySelector('#testimonial')) {

		var testimDots = Array.prototype.slice.call(document.getElementById("testimonial-dots").children),
			testimContent = Array.prototype.slice.call(document.getElementById("testimonial-content").children),
			testimonial = document.getElementById("testimonial"),
			testimLeftArrow = document.getElementById("left-arrow"),
			testimRightArrow = document.getElementById("right-arrow"),
			testimSpeed = 4500,
			currentSlide = 0,
			currentActive = 0,
			testimTimer,
			touchStartPos,
			touchEndPos,
			touchPosDiff,
			ignoreTouch = 30;

		// testimonial Script
		function playSlide(slide) {

			for (var k = 0; k < testimDots.length; k++) {
				testimContent[k].classList.remove("active");
				testimContent[k].classList.remove("inactive");
				testimDots[k].classList.remove("active");
			}

			if (slide < 0) {
				slide = currentSlide = testimContent.length - 1;
			}

			if (slide > testimContent.length - 1) {
				slide = currentSlide = 0;
			}

			if (currentActive !== currentSlide) {
				testimContent[currentActive].classList.add("inactive");
			}
			testimContent[slide].classList.add("active");
			testimDots[slide].classList.add("active");

			currentActive = currentSlide;

			clearTimeout(testimTimer);
			testimTimer = setTimeout(function() {
				playSlide(currentSlide += 1);
			}, testimSpeed);
		}

		testimLeftArrow.addEventListener("click", function() {
			playSlide(currentSlide -= 1);
		});

		testimRightArrow.addEventListener("click", function() {
			playSlide(currentSlide += 1);
		});

		for (var l = 0; l < testimDots.length; l++) {
			testimDots[l].addEventListener("click", function() {
				playSlide(currentSlide = testimDots.indexOf(this));
			});
		}

		// keyboard shortcuts
		document.addEventListener("keydown", function(e) {
			switch (e.key) {
				case "ArrowLeft":
					testimLeftArrow.click();
					break;
				case "ArrowRight":
					testimRightArrow.click();
					break;
				default:
					break;
			}
		});

		testimonial.addEventListener("touchstart", function(e) {
			touchStartPos = e.changedTouches[0].clientX;
		});

		testimonial.addEventListener("touchend", function(e) {
			touchEndPos = e.changedTouches[0].clientX;

			touchPosDiff = touchStartPos - touchEndPos;

			if (touchPosDiff > 0 + ignoreTouch) {
				testimLeftArrow.click();
			} else if (touchPosDiff < 0 - ignoreTouch) {
				testimRightArrow.click();
			} else {
				return;
			}
		});

		// load testimonials from JSON file
		fetch('testimonials.json')
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				var messages = data.map(function(testimonial) {
					return testimonial.message;
				});
				var authors = data.map(function(testimonial) {
					return testimonial.author;
				});
				testimContent.forEach(function(element, index) {
					element.querySelector('.testimonial-message').innerHTML = messages[index];
					element.querySelector('.testimonial-author').innerHTML = authors[index];
				});
			})
			.catch(function(error) {
				console.log('An error occurred while fetching the testimonials:', error);
			});

		playSlide(currentSlide);
	}
	
};


