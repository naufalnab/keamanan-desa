
// Show Register Form
function showRegister() {
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('register').classList.remove('hidden');
}

// Show Login Form
function showLogin() {
    document.getElementById('register').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
}

// Register User
function register() {
    let username = document.getElementById('regUsername').value;
    let password = document.getElementById('regPassword').value;

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Registration successful!');
        showLogin();
    } else {
        alert('Please fill all fields');
    }
}

// Login User
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        alert("Login berhasil!");
        window.location.href = "pages/beranda.html"; 
    } else {
        alert("Username atau password salah!");
    }
}


// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered'));
}
