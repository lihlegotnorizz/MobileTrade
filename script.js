// script.js

// Modal functionality
const loginBtn = document.getElementById('login-btn');
const modal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.close');
const registerBtn = document.getElementById('register-btn');

loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

registerBtn.addEventListener('click', () => {
    alert('Register functionality would be implemented here.');
});

// Trade-in calculator
const tradeForm = document.getElementById('trade-form');
const resultDiv = document.getElementById('result');

tradeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const model = document.getElementById('phone-model').value;
    const condition = document.getElementById('condition').value;

    // Simple mock calculation
    let baseValue = 500; // Base value for demo
    switch (condition) {
        case 'Excellent':
            baseValue *= 1.0;
            break;
        case 'Good':
            baseValue *= 0.8;
            break;
        case 'Fair':
            baseValue *= 0.6;
            break;
        case 'Poor':
            baseValue *= 0.4;
            break;
    }

    resultDiv.textContent = `Estimated trade-in value for ${model} in ${condition} condition: $${baseValue.toFixed(0)}`;
});

// Smooth scroll for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});