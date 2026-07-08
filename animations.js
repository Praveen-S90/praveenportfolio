/* ==========================================================================
   ANIMATIONS.JS - Scroll reveals, element intersections & custom transforms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-reveal trigger using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserverOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px', // Trigger slightly before reaching center of screen
            threshold: 0.15
        };
        
        const revealObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated into view to conserve process resources
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealObserverCallback, revealObserverOptions);
        revealElements.forEach(element => revealObserver.observe(element));
    }
    
    // 2. Micro-interactions: Floating element shapes
    const floatingElements = document.querySelectorAll('.floating-card, .image-glow');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        floatingElements.forEach(el => {
            // Translate shapes slightly opposite to cursor displacements to simulate parallax
            const depth = 20;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            if (el.classList.contains('floating-card')) {
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
});
