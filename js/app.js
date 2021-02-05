/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
**/


/**
 * Define Global Variables
 *
*/
let didScroll;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
const getChildIds = (query) => {
    const children = document.querySelectorAll(query)
    const numSections = [children.length];
    let childIds = [numSections];
    for (var i = 0; i < numSections; i++) {
        childIds[i] = children[i].id;
    }
    return childIds;
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// Build the nav
const buildNav = () => {
    const sectionIds = getChildIds('main > section');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < sectionIds.length; i++) {
        const newListItem = document.createElement('li');
        const newLink = document.createElement('a');
        const newLinkText = document.createTextNode(document.querySelector('#' + sectionIds[i]).getAttribute('data-nav'));
        newLink.classList.add('menu__link');
        if (i == 0) {
            newLink.classList.add('active');
        }
        newLink.href = '#' + sectionIds[i];
        newLink.appendChild(newLinkText);
        newLink.id = 'nav-' + sectionIds[i];
        newListItem.appendChild(newLink);
        fragment.appendChild(newListItem);
    }
    document.getElementById('navbar__list').style.display = 'none'; // hide navigation on load until active section is updated
    document.getElementById('navbar__list').appendChild(fragment);
}


// Add class 'active' to section and its navigation link when near top of viewport
const setActiveSection = () => {
    const observer = new IntersectionObserver((entries) => {
        //
        console.log(entries)
        //
        const sectionIds = getChildIds('main > section');
        for (let i = 0; i < entries.length; i++) {
            if (entries[i]['isIntersecting'] && !entries[i]['isVisible']) {
                const sectionId = entries[i].target.id;
                entries[i].target.classList.add('active');
                document.getElementById('nav-' + sectionId).classList.add('active');
                for (let j = 0; j < sectionIds.length; j++) {
                    if (sectionIds[j] != sectionId) {
                        document.getElementById(sectionIds[j]).classList.remove('active');
                        document.getElementById('nav-' + sectionIds[j]).classList.remove('active');
                    }
                }
            }
        }
    },{threshold: [0.35]});
    const sectionIds = getChildIds('main > section');
    for (let i = 0; i < sectionIds.length; i++) {
        observer.observe(document.querySelector('#' + sectionIds[i]));
    }
}


// Scroll to anchor ID using scrollTO event
const scrollToSection = () => {
    const navLinks = document.getElementsByClassName('menu__link');
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', (event) => {
            event.preventDefault();
            const linkTarget = event.target.getAttribute('href');
            const element = document.querySelector(linkTarget);
            const topPos = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({
                top: topPos,
                behavior: 'smooth'
            });
        });
    }
}


// Hide fixed navigation bar while not scrolling
const hideNavOnScroll = () => {
    document.addEventListener('scroll', function(){
        didScroll = true;
        document.getElementById('navbar__list').style.display = 'none';
      });
      // run hasScrolled() and reset didScroll status
      setInterval(function() {
        if (didScroll) {
            didScroll = false;
        } else {
            document.getElementById('navbar__list').style.display = '';
        }
      }, 250);
}


// Scroll back to top
const scrollBackToTop = () => {
    document.getElementById('back__top').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Show back to top button when below the fold
const showBackToTop = () => {
    const windowInnerHeight = window.innerHeight;
    console.log(windowInnerHeight);
    window.addEventListener('scroll', () => {
        console.log(window.pageYOffset);
        if ( window.pageYOffset > windowInnerHeight ) {
            document.getElementById('back__top').classList.add('show');
        } else {
            document.getElementById('back__top').classList.remove('show');
        }
    });
}


// Build menu
buildNav();

// Scroll to section on link click
scrollToSection();

// Set sections as active
setActiveSection();

// Hide navigation on scroll
hideNavOnScroll();

// Set back to top
showBackToTop();
scrollBackToTop();