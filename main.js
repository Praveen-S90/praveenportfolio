/* ==========================================================================
   MAIN.JS - Global initializations, DOM bindings & page utilities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('DEEPu. AI Portfolio initialized.');
    
    // Set dynamic copyright year in footer
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for Anchor Links with offset adjustment
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
