/* ==========================================================================
   CONTACT-FORM.JS - Mock contact form success behavior
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (!contactForm) return;

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const setStatus = (state, message = '') => {
        formStatus.className = 'form-status';
        formStatus.innerHTML = '';

        if (state === 'idle') {
            formStatus.style.display = 'none';
            return;
        }

        formStatus.style.display = 'flex';
        formStatus.classList.add(state);

        if (state === 'loading') {
            formStatus.innerHTML = `
                <span class="spinner"></span>
                <span>${message}</span>
            `;
            return;
        }

        const icon = state === 'success' ? '✓' : '!';
        formStatus.innerHTML = `
            <span>${icon}</span>
            <span>${message}</span>
        `;
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameField = document.getElementById('form-name');
        const emailField = document.getElementById('form-email');
        const subjectField = document.getElementById('form-subject');
        const messageField = document.getElementById('form-message');

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const subject = subjectField.value.trim();
        const message = messageField.value.trim();

        if (!name || !email || !subject || !message) {
            setStatus('error', 'Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            setStatus('error', 'Please enter a valid email address.');
            emailField.focus();
            return;
        }

        setStatus('loading', 'Sending message...');
        submitBtn.disabled = true;

        setTimeout(() => {
            setStatus('success', 'Message sent successfully! Praveen will contact you soon.');
            contactForm.reset();
            submitBtn.disabled = false;

            setTimeout(() => {
                setStatus('idle');
            }, 5000);
        }, 1500);
    });
});
