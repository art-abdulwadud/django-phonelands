// Animation DOM Elements
const offersSlider = document.querySelectorAll('.offer-slider');
const slideBtns = document.querySelector('.slide-btns');
const oldPrice = document.querySelectorAll('#old-price');
const newPrice = document.querySelectorAll('#new-price');
const offerPercentage = document.querySelectorAll('#offer-percentage');

// Animation for the intro slider
const colorToBlack = element => (element.style.color = 'rgba(0,0,0,0.1)');
const colorToWhite = element => (element.style.color = 'white');

let display = 0;
let slideLinksArray = [];

const animate = (slide, chooseSlide = null) => {
	slide < 0 ? (display = offersSlider.length - 1) : null;
	slide > offersSlider.length - 1 ? (display = 0) : null;
	// Hide all slides
	for (let i = 0; i < offersSlider.length; i++) {
		offersSlider[i].setAttribute('class', 'd-none');
		newPrice[i].innerText = '';
	}
	// Displaying one slide at a time
	offersSlider[display].setAttribute('class', 'offer-slider two-secs');
	let x = parseFloat(oldPrice[display].innerText) * (parseFloat(offerPercentage[display].innerText) / 100);
	newPrice[display].innerText = x.toFixed(2);
	// Creating slide links
	for (let i = 0; i < offersSlider.length; i++) {
		let slideLink = document.createElement('span');
		slideLink.setAttribute('class', 'slide-link cursor');
		let slideLinkIcon = document.createElement('i');
		slideLinkIcon.setAttribute('class', 'material-icons');
		slideLinkIcon.innerHTML = 'brightness_1';
		slideLinksArray.push(slideLink);
		if (slideLinksArray.length < offersSlider.length + 1) {
			slideBtns.appendChild(slideLink);
			slideLink.appendChild(slideLinkIcon);
		}
	}
	// Highlighting active slide link
	for (let i = 0; i < slideLinksArray.length; i++) {
		colorToBlack(slideLinksArray[i]);
		colorToWhite(slideLinksArray[display]);
	}
	// Manually selecting a slide
	if (chooseSlide) {
		chooseSlide < 0 ? (chooseSlide = offersSlider.length - 1) : null;
		chooseSlide > offersSlider.length - 1 ? (chooseSlide = 0) : null;
		display = chooseSlide;
		for (let i = 0; i < offersSlider.length; i++) {
			offersSlider[i].setAttribute('class', 'd-none');
			newPrice[i].innerText = '';
		}
		slideLinksArray.forEach(slideLink => {
			colorToBlack(slideLink);
		});
		offersSlider[display].setAttribute('class', 'offer-slider two-secs');
		let x = parseFloat(oldPrice[display].innerText) * (parseFloat(offerPercentage[display].innerText) / 100);
		newPrice[display].innerText = x.toFixed(2);
		colorToWhite(slideLinksArray[display]);
	}
};
// Check if the slider is on the page
if (offersSlider != null) {
	// Generating first slider on load
	animate(display);
	// Next slide button
	let nextSpan = document.createElement('span');
	nextSpan.setAttribute('class', 'cursor');
	nextSpan.setAttribute('id', 'prev');
	let nextIcon = document.createElement('i');
	nextIcon.setAttribute('class', 'material-icons');
	nextIcon.innerHTML = 'chevron_right';
	slideBtns.appendChild(nextSpan);
	nextSpan.appendChild(nextIcon);
	// Go to next slide automaticatlly
	let autoSlide = setInterval(() => {
		animate(display, display + 1);
	}, 5000);
	// Go to next slide on clicking next
	nextSpan.addEventListener('click', () => {
		clearInterval(autoSlide);
		animate(display, display + 1);
	});
	// Go to previous slide on clicking previous
	const prev = document.querySelector('#prev');
	prev.addEventListener('click', () => {
		clearInterval(autoSlide);
		display - 1 != 0 ? animate(display, display - 1) : animate(display, offersSlider.length + 1);
	});
	// Creating link for each slide
	slideLinksArray.forEach(slideLink => {
		slideLink.addEventListener('click', () => {
			clearInterval(autoSlide);
			slideLinksArray.indexOf(slideLink) != 0
				? animate(display, slideLinksArray.indexOf(slideLink))
				: animate(display, offersSlider.length + 1);
		});
	});
}
