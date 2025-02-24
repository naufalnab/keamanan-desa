// Get user data from localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Check if user is logged in, redirect to login page if not
if (!currentUser) {
    window.location.href = '../index.html';
}

// DOM Elements
const reportPopup = document.getElementById('reportPopup');
const closePopup = document.querySelector('.close');
const reportForm = document.getElementById('reportForm');
const homeNav = document.getElementById('homeNav');
const monitoringNav = document.getElementById('monitoringNav');
const userNav = document.getElementById('userNav');
const userPage = document.getElementById('userPage');
const openPopup = document.getElementById('openPopup');
const panicButton = document.getElementById('panicButton');

// Display user data in the user profile
document.getElementById('userName').textContent = currentUser.name || currentUser.username;
document.getElementById('userAddress').textContent = currentUser.address || 'Alamat belum diatur';
document.getElementById('userContact').textContent = currentUser.contact || 'Kontak belum diatur';

// Event Listeners
closePopup.addEventListener('click', function() {
    reportPopup.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == reportPopup) {
        reportPopup.style.display = 'none';
    }
});

// Navigation functions
homeNav.addEventListener('click', function() {
    userPage.classList.add('hidden');
    openPopup.classList.remove('hidden');
    panicButton.classList.remove('hidden');
    homeNav.classList.add('active');
    userNav.classList.remove('active');
    monitoringNav.classList.remove('active');
});

userNav.addEventListener('click', function() {
    userPage.classList.remove('hidden');
    openPopup.classList.add('hidden');
    panicButton.classList.add('hidden');
    userNav.classList.add('active');
    homeNav.classList.remove('active');
    monitoringNav.classList.remove('active');
});

monitoringNav.addEventListener('click', function() {
    // This would be for a monitoring page that doesn't exist yet
    alert('Fitur monitoring belum tersedia');
    monitoringNav.classList.add('active');
    homeNav.classList.remove('active');
    userNav.classList.remove('active');
});

// Logout function
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Show report form based on incident type
function showReportForm(type) {
    reportPopup.style.display = 'block';
    // Set the incident type in the form
    document.getElementById('reportForm').dataset.type = type;
    
    // Get and display current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                document.getElementById('location').textContent = `Lokasi: ${lat.toFixed(6)}, ${long.toFixed(6)}`;
            },
            error => {
                document.getElementById('location').textContent = 'Lokasi tidak dapat diakses';
                console.error('Error getting location:', error);
            }
        );
    } else {
        document.getElementById('location').textContent = 'Geolocation tidak didukung di browser ini';
    }
}

// Submit report function
function submitReport() {
    const description = document.getElementById('description').value.trim();
    const media = document.getElementById('mediaUpload').files[0];
    const type = document.getElementById('reportForm').dataset.type;
    const location = document.getElementById('location').textContent;
    
    if (!description) {
        alert('Silakan berikan deskripsi kejadian');
        return;
    }
    
    // This is a demo, so we're just alerting the report details
    // In a real app, you would send this data to your server
    const reportDetails = {
        type: type,
        description: description,
        location: location,
        timestamp: new Date().toISOString(),
        reporter: currentUser.username,
        hasMedia: !!media
    };
    
    console.log('Report submitted:', reportDetails);
    alert('Laporan berhasil dikirim! Petugas akan segera merespon.');
    
    // Close popup and reset form
    reportPopup.style.display = 'none';
    document.getElementById('description').value = '';
    document.getElementById('mediaUpload').value = '';
}

// Panic button function
function triggerPanic() {
    if (confirm('Anda yakin ingin mengirim sinyal DARURAT?')) {
        // Get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    
                    // In a real app, you would send an emergency signal to your server
                    const emergencyDetails = {
                        type: 'EMERGENCY',
                        location: `${lat.toFixed(6)}, ${long.toFixed(6)}`,
                        timestamp: new Date().toISOString(),
                        reporter: currentUser.username
                    };
                    
                    console.log('Emergency signal sent:', emergencyDetails);
                    alert('SINYAL DARURAT TELAH DIKIRIM! Bantuan akan segera datang.');
                },
                error => {
                    alert('Lokasi tidak dapat diakses, tetapi sinyal darurat tetap dikirim!');
                    console.error('Error getting location:', error);
                }
            );
        } else {
            alert('Geolocation tidak didukung, tetapi sinyal darurat tetap dikirim!');
        }
    }
}

// Set the home nav as active by default
homeNav.classList.add('active');