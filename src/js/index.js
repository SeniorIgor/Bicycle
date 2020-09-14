import Swiper, { Pagination } from 'swiper';
import './validForm';

import './../styles/style.scss';
import 'swiper/swiper-bundle.css';

//<Burger Menu>===============================================================
document.addEventListener('DOMContentLoaded', () => {
	const elem = document.querySelector('.icon-menu');
	const menu = document.querySelector('.menu__body');

	if (elem && menu) {
		elem.addEventListener('click', () => {
			elem.classList.toggle('active');
			menu.classList.toggle('active');
			document.body.classList.toggle('lock');
		});
	}
});
//</Burger Menu>=============================================================

//<Image BackgroundImage>===========================================================
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
//</Image BackgroundImage>===========================================================

//<Slider Swiper>===========================================================
Swiper.use([Pagination]);
const swiper = new Swiper('.swiper-container', {
	autoHeight: true,
	spaceBetween: 30,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	}
});
//</Slider Swiper>=========================================================