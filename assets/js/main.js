/*==================== MENU SHOW Y HIDDEN ====================*/

const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}


/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/*===== About  =====*/
function animateNumber(element, targetNumber, duration) {
    const sign = targetNumber >= 0 ? '+' : '-';
    const startNumber = 0;
    const increments = targetNumber / (duration / 10);
    let currentNumber = 0;
    const interval = setInterval(() => {
        currentNumber += increments;
        if ((increments > 0 && currentNumber >= targetNumber) || (increments < 0 && currentNumber <= targetNumber)) {
            currentNumber = targetNumber;
            clearInterval(interval);
        }
        element.textContent = `${sign} ${Math.floor(Math.abs(currentNumber))}`;
    }, 10);
}

function startNumberAnimationOnScroll() {
    const titles = document.querySelectorAll('.about_info-title');
    const targetNumbers = [3, 19, 39];
    const animationDuration = 2000;

    let animationStarted = false;
    window.addEventListener('scroll', () => {
        const sectionOffset = document.querySelector('.section').offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (!animationStarted && scrollPosition >= sectionOffset + 560) {
            titles.forEach((title, index) => {
                animateNumber(title, targetNumbers[index], animationDuration);
            });
            animationStarted = true;
        }
    });
}

startNumberAnimationOnScroll();


/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav_link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName('skills_content'),
    skillsHeader = document.querySelectorAll('.skills_header');

function toggleSkills() {

    let itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills_content skills_close';
    }

    if (itemClass === 'skills_content skills_close') {
        this.parentNode.className = 'skills_content skills_open';
    }
}


skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/

const tabs = document.querySelectorAll('[data-target]'),
    tabsContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabsContents.forEach(tabContent => {
            tabContent.classList.remove('qualification_active')
        })
        target.classList.add('qualification_active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification_active')
        })
        tab.classList.add('qualification_active');
    });
})

/*==================== SERVICES MODAL ====================*/

const modalBtns = document.querySelectorAll('.services_button');
const modalCloses = document.querySelectorAll('.services_modal-close');

modalBtns.forEach((modalBtn) => {
    modalBtn.addEventListener('click', () => {
        const modal = modalBtn.parentElement.querySelector('.services_modal');
        modal.classList.add('active-modal');
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        const modal = modalClose.closest('.services_modal');
        modal.classList.remove('active-modal');
    });
});



/*==================== Slide SWIPER  ====================*/

let swiper = new Swiper('.Slide_container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }

});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector('.nav_menu a[href*="' + sectionId + '"]');
        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);


/*==================== CHANGE BACKGROUND HEADER ====================*/

function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})