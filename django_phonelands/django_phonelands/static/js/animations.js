// Animation DOM Elements
const first = document.querySelector('.first');
const second = document.querySelector('.second');
const slideOne = document.querySelector('.slide-one');
const slideTwo = document.querySelector('.slide-two');

// Animation for the intro slider
const colorToBlack = element => (element.style.color = 'rgba(0,0,0,0.1)');
const colorToWhite = element => (element.style.color = 'white');
if (slideTwo != null) {
	colorToBlack(slideTwo);
	colorToWhite(slideOne);
}
let display = 0;

const animate = (d = null) => {
	if (d === 'next') {
		display > 1 ? (display = 0) : display + 1;
	} else if (d === 'first') {
		display = 0;
	} else if (d === 'second') {
		display = 1;
	} else {
		display < 0 ? (display = 1) : display + 0;
	}
	if (display === 0) {
		display = 1;
		second.setAttribute('class', 'second d-none');
		first.setAttribute('class', 'two-secs first');
		colorToBlack(slideTwo);
		colorToWhite(slideOne);
	} else {
		display = 0;
		first.setAttribute('class', 'first d-none');
		second.setAttribute('class', 'two-secs second');
		colorToBlack(slideOne);
		colorToWhite(slideTwo);
	}
};

if (first != null && second != null) {
	setTimeout(animate, 1000);
	const startInterval = setInterval(animate, 5000);
}

