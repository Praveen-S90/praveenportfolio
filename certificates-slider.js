/* ==========================================================================
   CERTIFICATES-SLIDER.JS - Custom dual-row slide controls, desktop drag scroll & sync dots
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const row1 = document.getElementById('row1-inner');
    const row2 = document.getElementById('row2-inner');
    
    const btnLeft1 = document.getElementById('row1-left');
    const btnRight1 = document.getElementById('row1-right');
    const btnLeft2 = document.getElementById('row2-left');
    const btnRight2 = document.getElementById('row2-right');
    
    const dots = document.querySelectorAll('.indicator-dot');
    
    // 1. Scroll actions via Left/Right Buttons
    const getScrollAmount = (rowElement) => {
        // Scroll by roughly 2 cards width plus gap
        const cardWidth = 280;
        const gap = 24;
        return (cardWidth + gap) * 2;
    };
    
    if (row1 && btnLeft1 && btnRight1) {
        btnLeft1.addEventListener('click', () => {
            row1.scrollBy({ left: -getScrollAmount(row1), behavior: 'smooth' });
        });
        btnRight1.addEventListener('click', () => {
            row1.scrollBy({ left: getScrollAmount(row1), behavior: 'smooth' });
        });
    }
    
    if (row2 && btnLeft2 && btnRight2) {
        btnLeft2.addEventListener('click', () => {
            row2.scrollBy({ left: -getScrollAmount(row2), behavior: 'smooth' });
        });
        btnRight2.addEventListener('click', () => {
            row2.scrollBy({ left: getScrollAmount(row2), behavior: 'smooth' });
        });
    }
    
    // 2. Desktop Mouse Click-and-Drag-to-Scroll behavior
    const enableDragScroll = (slider) => {
        if (!slider) return;
        
        let isDown = false;
        let startX;
        let scrollLeftVal;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            slider.classList.add('active-dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeftVal = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.classList.remove('active-dragging');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.classList.remove('active-dragging');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            // Scroll multiplier: speed up displacement
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeftVal - walk;
        });
        
        // Default cursor pointer state
        slider.style.cursor = 'grab';
    };
    
    enableDragScroll(row1);
    enableDragScroll(row2);
    
    // 3. Scroll Sync & Indicators Dot Updates
    const updateDots = () => {
        if (!row1) return;
        
        // Calculate scroll progress percentage on Row 1 (main reference)
        const maxScroll = row1.scrollWidth - row1.clientWidth;
        if (maxScroll <= 0) return;
        
        const scrollPct = row1.scrollLeft / maxScroll;
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            
            // For 2 dots: split index threshold in middle
            if (scrollPct < 0.5 && index === 0) {
                dot.classList.add('active');
            } else if (scrollPct >= 0.5 && index === 1) {
                dot.classList.add('active');
            }
        });
    };
    
    if (row1) {
        row1.addEventListener('scroll', updateDots);
    }
    
    // Make dots clickable to jump pages
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!row1 || !row2) return;
            
            const maxScroll1 = row1.scrollWidth - row1.clientWidth;
            const maxScroll2 = row2.scrollWidth - row2.clientWidth;
            
            const targetScroll1 = index === 0 ? 0 : maxScroll1;
            const targetScroll2 = index === 0 ? 0 : maxScroll2;
            
            row1.scrollTo({ left: targetScroll1, behavior: 'smooth' });
            row2.scrollTo({ left: targetScroll2, behavior: 'smooth' });
        });
    });
});
