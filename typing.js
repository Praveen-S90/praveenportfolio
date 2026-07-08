/* ==========================================================================
   TYPING.JS - High fidelity typing animation for Hero Subtitle roles
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const textTarget = document.getElementById('typing-text');
    if (!textTarget) return;
    
    // Array of skills to cycle through
    const words = [
        "Data Scientist",
        "AI Engineer",
        "Machine Learning Engineer",
        "Computer Vision Developer"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Time in ms per character
    
    const type = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            textTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletion is twice as fast
        } else {
            // Add character
            textTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing rate
        }
        
        // Handle word completions
        if (!isDeleting && charIndex === currentWord.length) {
            // Hold completed word in view for 2 seconds
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            wordIndex = (wordIndex + 1) % words.length;
            // Half second buffer before starting next word
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    };
    
    // Start animation loop after 1 second buffer
    setTimeout(type, 1000);
});
