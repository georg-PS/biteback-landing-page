const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;
const navBottom = parseFloat(window.getComputedStyle(nav).getPropertyValue('bottom'));
const logo = document.querySelector('.logo');
const navCtaButton = document.querySelector('#nav-cta-button');
const instagramLogo = document.querySelector('#instagram');
const copyrightAnnotation = document.querySelector('.copyright');

const hideDistance = navHeight + navBottom;
let prevPos = window.scrollY;

let navTimeout;

function expandNav() {
    nav.classList.toggle('full-width');

    clearTimeout(navTimeout);
    if (nav.classList.contains('full-width')) {
        navTimeout = setTimeout(() => {
            expandNav();
        }, 5000);
    }
}

function hideNavBar() {
    let currentPos = window.scrollY;
    if (prevPos < currentPos) {
        nav.style.transform = `translateY(${hideDistance}px)`
    } else {
        nav.style.transform = 'translateY(0)';
    }
    prevPos = currentPos;
}

window.addEventListener('scroll', hideNavBar);
logo.addEventListener('click', expandNav);

copyrightAnnotation.innerText = `© ${new Date().getFullYear()} BiteBack Inc.`;
