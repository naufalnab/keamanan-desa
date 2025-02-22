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


let selectedReportType = "";
const reportForm = document.getElementById("reportForm");
const popup = document.getElementById("reportPopup");
const closePopup = document.getElementsByClassName("close")[0];
const openPopupBtn = document.getElementById("openPopup");

function showReportForm(type) {
    selectedReportType = type;
    reportForm.style.display = "block";
}

function openPopup() {
    popup.style.display = "block";
}

function closePopupFunction() {
    popup.style.display = "none";
    document.getElementById("description").value = "";
    document.getElementById("mediaUpload").value = "";
    document.getElementById("location").innerText = "";
    reportForm.style.display = "none";
}

openPopupBtn.onclick = openPopup;
closePopup.onclick = closePopupFunction;

window.onclick = function (event) {
    if (event.target == popup) {
        closePopupFunction();
    }
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById("location").innerText =
                `Lokasi: ${position.coords.latitude}, ${position.coords.longitude}`;
        }, (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Pengguna menolak permintaan Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Informasi lokasi tidak tersedia.");
                    break;
                case error.TIMEOUT:
                    alert("Waktu permintaan lokasi habis.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("Terjadi kesalahan yang tidak diketahui.");
                    break;
            }
        });
    } else {
        alert("GPS tidak didukung di browser ini.");
    }
}

function submitReport() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            sendReport(latitude, longitude);
        }, function (error) {
            console.error("Gagal mendapatkan lokasi:", error);
            sendReport(null, null);
        });
    } else {
        console.error("Geolocation tidak didukung.");
        sendReport(null, null);
    }
}

function sendReport(latitude, longitude) {
    const description = document.getElementById("description").value;
    const fileInput = document.getElementById("mediaUpload").files[0];
    const locationText = latitude && longitude ? `Lat: ${latitude}, Lng: ${longitude}` : "Lokasi tidak tersedia";
    console.log("Deskripsi:", description);
    console.log("Lokasi:", locationText);

    if (fileInput) {
        console.log("File diunggah:", fileInput.name);
    }

    alert("Laporan berhasil dikirim!");
}


document.querySelectorAll('.nav-item').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        alert(`Navigasi ke ${index === 0 ? 'Beranda' : index === 1 ? 'Monitoring' : 'User'}`);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            alert("Anda telah logout!");
            window.location.href = "../index.html";
        });
    }

    // Highlight active nav button
    const navItems = document.querySelectorAll(".nav-item");
    const currentPage = window.location.pathname.split("/").pop();

    navItems.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (btn.id === "homeNav") {
                window.location.href = "beranda.html";
            } else if (btn.id === "monitoringNav") {
                window.location.href = "monitoring.html";
            } else if (btn.id === "userNav") {
                window.location.href = "user.html";
            }
        });

        if (btn.id === "homeNav" && currentPage === "beranda.html") btn.classList.add("active");
        if (btn.id === "monitoringNav" && currentPage === "monitoring.html") btn.classList.add("active");
        if (btn.id === "userNav" && currentPage === "user.html") btn.classList.add("active");
    });
});


navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'homeNav') {
            window.location.href = 'beranda.html';
        } else if (btn.id === 'monitoringNav') {
            window.location.href = 'monitoring.html';
        } else if (btn.id === 'userNav') {
            window.location.href = 'user.html';
        }
    });
});