// Dummy users for demo
const dummyUsers = {
    'admin': {
        password: 'admin123',
        email: 'admin@keamanandesa.com',
        role: 'admin',
        name: 'Administrator',
        address: 'Kantor Desa, Jl. Utama No. 1',
        contact: '081234567890'
    },
    'user': {
        password: 'user123',
        email: 'user@keamanandesa.com',
        role: 'warga',
        name: 'Pengguna Umum',
        address: 'Blok A RT 03 / RW 05, Desa Sejahtera',
        contact: '089876543210'
    }
};

// Toggle password visibility
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            input.type = 'password';
            this.classList.replace('fa-eye', 'fa-eye-slash');
        }
    });
});

// Toggle between login and register forms
function toggleForm(form) {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    
    if (form === 'register') {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    } else {
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    }
}

// Validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Register new user
function register() {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;

    // Validation
    if (!username || !email || !password || !passwordConfirm) {
        showError('Semua field harus diisi');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Format email tidak valid');
        return;
    }

    if (password !== passwordConfirm) {
        showError('Password tidak cocok');
        return;
    }

    if (password.length < 6) {
        showError('Password minimal 6 karakter');
        return;
    }

    if (dummyUsers[username]) {
        showError('Username sudah digunakan');
        return;
    }

    // Save new user
    dummyUsers[username] = {
        password: password,
        email: email,
        role: 'warga',
        name: username,
        address: 'Alamat belum diatur',
        contact: 'Kontak belum diatur'
    };

    showSuccess('Registrasi berhasil! Silakan login.');
    toggleForm('login');
}

// Login user
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validation
    if (!username || !password) {
        showError('Username dan password harus diisi');
        return;
    }

    const user = dummyUsers[username];
    if (!user || user.password !== password) {
        showError('Username atau password salah');
        return;
    }

    // Save login state
    localStorage.setItem('currentUser', JSON.stringify({
        username: username,
        role: user.role,
        email: user.email,
        name: user.name,
        address: user.address,
        contact: user.contact
    }));

    showSuccess('Login berhasil!');
    setTimeout(() => {
        window.location.href = 'pages/beranda.html';
    }, 1000);
}

// Show error message
function showError(message) {
    alert(message); // You can replace this with a better UI notification
}

// Show success message
function showSuccess(message) {
    alert(message); // You can replace this with a better UI notification
}

// Check if user is already logged in
function checkLoginState() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'pages/beranda.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', checkLoginState);

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(error => console.error('Service Worker registration failed:', error));
}