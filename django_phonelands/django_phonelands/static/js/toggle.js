// Navbar DOM Elements
const menuToggle = document.querySelector('.toggler');
const nav = document.querySelector('#nav');
const droplink = document.querySelector('.droplink');
const navDropdown = document.querySelector('#nav-dropdown-wrapper');
const less = document.querySelector('.less');
const more = document.querySelector('.more');
// Toggle navbar on smaller devices
let smallNavActive = false;

menuToggle.addEventListener('click', () => {
	if (smallNavActive) {
		nav.setAttribute('class', 'navlist');
		smallNavActive = false;
	} else {
		nav.setAttribute('class', 'small-nav');
		smallNavActive = true;
	}
});

// Toggle the dropdown menu smaller devices
let dropdownActive = false;
droplink.addEventListener('click', () => {
	if (dropdownActive) {
		navDropdown.setAttribute('class', 'nav-dropdown animated shake small-text');
		dropdownActive = false;
	} else {
		navDropdown.setAttribute('class', 'nav-dropdown small-nav-dropdown animated shake small-text');
		dropdownActive = true;
	}
});

// Intro slider
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

if (next != null) {
	next.addEventListener('click', () => {
		clearInterval(startInterval);
		animate('next');
	});
	prev.addEventListener('click', () => {
		clearInterval(startInterval);
		animate('prev');
	});
	slideOne.addEventListener('click', () => {
		animate('first');
	});
	slideTwo.addEventListener('click', () => {
		animate('second');
	});
}

// Recent items slider
const nextImg = document.querySelector('#next-img');
const prevImg = document.querySelector('#prev-img');

if (nextImg != null && prevImg != null) {
	nextImg.addEventListener('click', () => {
		clearInterval(rInterval);
		animateRecentItem();
	});

	prevImg.addEventListener('click', () => {
		clearInterval(rInterval);
		animateRecentItem('prev');
	});
}

// Toggle Lightbox
const mainImg = document.querySelector('.main-img');
const imgItems = document.querySelectorAll('.img-item');

if (mainImg != null) {
	imgItems.forEach(imgItem => {
		imgItem.addEventListener('mouseover', () => {
			mainImg.src = imgItem.src;
		});
	});
}


