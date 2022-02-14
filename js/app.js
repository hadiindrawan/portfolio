let btn = document.getElementById('toggleMenu');
let menu = document.getElementById('menu');
let sidebar = document.getElementById('sideBar');

btn.addEventListener('click', function() {
    if (menu.hasAttribute('show')) {
        menu.classList.remove('show');
        sidebar.classList.remove('expandSidebar');
    } else {
        menu.classList.toggle('show');
        sidebar.classList.toggle('expandSidebar');
    }
})

// nav active 
let path = window.location.pathname;
const homePage = document.getElementById('homeNav');
const porfolioPage = document.getElementById('porfolioNav');
const contactPage = document.getElementById('contactNav');

if (path == '/index.html') {
    homePage.classList.add('nav-active')
    porfolioPage.classList.remove('nav-active')
    contactPage.classList.remove('nav-active')
} else if (path == '/portfolio.html') {
    homePage.classList.remove('nav-active')
    porfolioPage.classList.add('nav-active')
    contactPage.classList.remove('nav-active')
} else {
    homePage.classList.remove('nav-active')
    porfolioPage.classList.remove('nav-active')
    contactPage.classList.add('nav-active')
}

// typed js
var typed = new Typed(".animate", {
      strings: [
        "Hadi Indrawan"
      ],
      typeSpeed: 160,
      backDelay: 80,
      backSpeed: 160,
      loop: true,
});

// scrollreveal
ScrollReveal({ reset: true });
ScrollReveal().reveal('.card-skill', {delay: 100});