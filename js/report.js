let selectedReportType = "";
const reportForm = document.getElementById("reportForm");
const popup = document.getElementById("reportPopup");
const closePopup = document.getElementsByClassName("close")[0];
const openPopupBtn = document.getElementById("openPopup");

function showReportForm(type) {
    selectedReportType = type;
    reportForm.style.display = "block"; // Show form inside the popup
}

// Function to open the popup
function openPopup() {
    popup.style.display = "block";
}

// Function to close the popup
function closePopupFunction() {
    popup.style.display = "none";
    // Reset form when closing popup
    document.getElementById("description").value = "";
    document.getElementById("mediaUpload").value = "";
    document.getElementById("location").innerText = "";
    reportForm.style.display = "none";
}

// Event listeners for opening and closing the popup
openPopupBtn.onclick = openPopup;
closePopup.onclick = closePopupFunction;

// Close if clicked outside the popup
window.onclick = function(event) {
    if (event.target == popup) {
        closePopupFunction();
    }
};

// Existing functions remain unchanged
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById("location").innerText = 
                `Lokasi: ${position.coords.latitude}, ${position.coords.longitude}`;
        }, (error) => {
            switch(error.code) {
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
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            sendReport(latitude, longitude);
        }, function(error) {
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