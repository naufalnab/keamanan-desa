// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');

// Navigation
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'homeNav') {
            // Already on home page
            return;
        } else if (btn.id === 'monitoringNav') {
            window.location.href = 'monitoring.html';
        } else if (btn.id === 'userNav') {
            window.location.href = 'user.html';
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav button
    navButtons.forEach(btn => {
        if (btn.id === 'homeNav') {
            btn.classList.add('active');
        }
    });
});