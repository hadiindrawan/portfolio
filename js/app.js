let btn = document.getElementById('toggleMenu');
let menu = document.getElementById('menu');
let sidebar = document.getElementById('sideBar');
let bgNav = document.getElementById('bgNav');

btn.addEventListener('click', function() {
    if (menu.hasAttribute('show')) {
        menu.classList.remove('show');
        sidebar.classList.remove('expandSidebar');
        bgNav.classList.remove('d-none');
    } else {
        menu.classList.toggle('show');
        sidebar.classList.toggle('expandSidebar');
        bgNav.classList.toggle('d-none');
    }
})

// nav active 
let path = window.location.pathname;
const homePage = document.getElementById('homeNav');
const porfolioPage = document.getElementById('porfolioNav');
const contactPage = document.getElementById('contactNav');

if (path == '/index.html' || path == '/') {
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

// responsive 
function myFunction(x) {
  if (x.matches) { // If media query matches
    document.getElementById('logoIg').src = '/asset/igwhite.png'
    document.getElementById('logoLnk').src = '/asset/linkwhite.png'
    document.getElementById('logoWa').src = '/asset/wawhite.png'
    document.getElementById('bgNav').setAttribute('style', 'display: block;')
  } else {
    document.getElementById('bgNav').setAttribute('style', 'display: none;')
  }
}

var x = window.matchMedia("(max-width: 576px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) 