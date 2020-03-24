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

// Animation for recent items slider
const itemdivs = document.querySelectorAll('.item');
const recentItems = document.querySelectorAll('.r-item');
const images = [
	'img/recent/one.png',
	'img/recent/two.png',
	'img/recent/three.png',
	'img/recent/four.png',
	'img/recent/five.png'
];

let one = 1;
let two = 2;
let three = 3;
let four = 4;

const animateImages = () => {
	recentItems[0].setAttribute('src', images[one]);
	recentItems[1].setAttribute('src', images[two]);
	recentItems[2].setAttribute('src', images[three]);
	recentItems[3].setAttribute('src', images[four]);

	itemdivs.forEach(item => {
		item.classList.add('animated', 'bounce');
		setTimeout(() => item.classList.remove('animated', 'bounce'), 1700);
	});
};

const chech = slide => {
	slide > images.length - 1 ? (slide = 0) : slide++;
	slide < 0 ? (slide = images.length - 1) : slide--;
};

const animateRecentItem = (i = null) => {
	if (i === 'prev') {
		animateImages();

		one--;
		two--;
		three--;
		four--;

		if (one < 0) {
			one = images.length - 1;
		}
		if (two < 0) {
			two = images.length - 1;
		}
		if (three < 0) {
			three = images.length - 1;
		}
		if (four < 0) {
			four = images.length - 1;
		}
	} else {
		animateImages();

		one++;
		two++;
		three++;
		four++;

		if (one > images.length - 1) {
			one = 0;
		}
		if (two > images.length - 1) {
			two = 0;
		}
		if (three > images.length - 1) {
			three = 0;
		}
		if (four > images.length - 1) {
			four = 0;
		}
	}
};

let rInterval;

if (recentItems.length > 1) {
	rInterval = setInterval(animateRecentItem, 5000);
}


