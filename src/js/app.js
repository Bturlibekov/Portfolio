// import * as flsFunctions from "./modules/functions.js"
// import { Modal } from '../js/libs/modal.js'
// import { Accordion } from '../js/libs/accordion.js'
// import * as noUiSlider from 'nouislider'
// import fslightbox from "fslightbox";
// import { animOnScroll } from "./libs/animOnScroll.js"
// import { headerFixed } from "./libs/fixed-header.js";
// import { simpleBar } from "simplebar"; => data-simplebar должен быть у обьекта
// import { select } from './libs/select.js';
// import { lazyLoading } from './libs/lazy-loading.js';
import { getHeaderHeight } from './libs/header-height.js';
import { mobileCheck } from './libs/mobile-check.js';
// import { backgroundImageWebp } from './libs/backgroundImageWebp.js'
// import Swiper, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
// Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
import AOS from 'aos'

AOS.init()

// Preloader
// window.addEventListener('load', function() {
//     let preloader = document.getElementById('preloader')
//     preloader.style.display = 'none'
//     document.body.style.overflow = 'auto'
// })
// Preloader

// flsFunctions.isWebP()
// animOnScroll()
// headerFixed();
// Accordion()
// select();
// lazyLoading();
getHeaderHeight();
mobileCheck();
// backgroundImageWebp()

const toggle = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');
const body = document.body;

toggle.addEventListener('click', () => {
  toggle.classList.toggle('burger--active');
  navbar.classList.toggle('navbar--active');
  body.classList.toggle('is-lock');
});

window.addEventListener("click", (event) => {
  if (event.target === navbar) {
    toggle.classList.remove('burger--active');
    navbar.classList.remove('navbar--active');
    body.classList.remove('is-lock');
  }
})

// Показать еще

const showMore = document.querySelector('.works__more-btn');
const productsLength = document.querySelectorAll('.works__col').length;

function showMoreColumns(length, none, show) {
  let items = length;

  if (productsLength <= none) {
    showMore.style.display = "none"
  }

  showMore.addEventListener('click', () => {
    items += show;
    const array = Array.from(document.querySelector('.works__grid').children);
    const visItems = array.slice(0, items);

    visItems.forEach(el => el.classList.add('is-visible'));

    if (visItems.length === productsLength) {
      showMore.style.display = "none";
    };
  });
}

// showMoreColumns(6, 6, 3);

function widthPC() {
  if (window.innerWidth > 1024) {
    showMoreColumns(6, 6, 3);
  }
}

function widthTablet() {
  if (window.innerWidth <= 1024) {
    showMoreColumns(4, 4, 2);
  }
}

widthPC();
widthTablet();

console.log(window.innerWidth)

// Показать еще


// Активный класс при скролле

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.navbar-link').forEach((link) => {
        let id = link.getAttribute('href').replace('#', '');
        if (id === entry.target.id) {
          link.classList.add('navbar-link--active')
        } else {
          link.classList.remove('navbar-link--active')
        }
      });
    }
  })
}, {
  threshold: 0.5
});

document.querySelectorAll('section').forEach(section => (observer.observe(section)));

// Активный класс при скролле

const navbarLinks = document.querySelectorAll('.navbar-link[data-scroll]');
if (navbarLinks.length > 0) {
  navbarLinks.forEach(navbarLink => {
    navbarLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(event) {
    const navbarLink = event.target;
    if (navbarLink.dataset.scroll && document.querySelector(navbarLink.dataset.scroll)) {
      const scrollBlock = document.querySelector(navbarLink.dataset.scroll);
      const scrollBlockValue = scrollBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      window.scrollTo({
        top: scrollBlockValue,
        behavior: "smooth"
      }),
        event.preventDefault();
    }
  }
}