/* ==========================================================================
   NAVBAR.JS - Mobile drawer toggle, sticky header scroll & IntersectionObserver active links
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 1. Sticky Header Scroll Trigger
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load to catch initial page offset
    
    // 2. Mobile Hamburger Toggle Drawer
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }
    
    // 3. Close Drawer when Navigation Links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });
    
    // 4. Scroll Active Section Highlighting using IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Target middle quadrant of viewport
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});
