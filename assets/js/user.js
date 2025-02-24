// Dummy user data
const userData = {
    name: "Naufal Nabila",
    role: "Admin",
    address: "Jl. Mawar No. 45, RT 03/RW 02",
    phone: "082328591004",
    email: "naufal.nabila.2008@gmail.com",
    joinDate: "15 Februari 2025",
    nik: "3271046709880001",
    occupation: "Pengusaha",
    recentReports: [
        { id: 1, type: "Keamanan", date: "21 Feb 2024", status: "Selesai" },
        { id: 2, type: "Darurat", date: "15 Feb 2024", status: "Diproses" },
        { id: 3, type: "Lingkungan", date: "10 Feb 2024", status: "Selesai" }
    ]
};

// DOM Elements
const editBtn = document.getElementById('editBtn');
const infoView = document.getElementById('infoView');
const editForm = document.getElementById('editForm');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const logoutBtn = document.getElementById('logoutBtn');
const navButtons = document.querySelectorAll('.nav-btn');

// Form inputs
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');

// Initialize user data
function initializeUserData() {
    // Set user info in view mode
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userRole').textContent = userData.role;
    document.getElementById('userAddress').textContent = userData.address;
    document.getElementById('userPhone').textContent = userData.phone;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userNIK').textContent = userData.nik;
    document.getElementById('userOccupation').textContent = userData.occupation;
    document.getElementById('userJoinDate').textContent = userData.joinDate;

    // Set form values
    nameInput.value = userData.name;
    phoneInput.value = userData.phone;
    emailInput.value = userData.email;

    // Initialize recent reports
    const reportsContainer = document.getElementById('recentReports');
    reportsContainer.innerHTML = userData.recentReports.map(report => `
        <div class="report-item">
            <div class="report-info">
                <div class="report-type">${report.type}</div>
                <div class="report-date">${report.date}</div>
            </div>
            <span class="report-status ${report.status === 'Selesai' ? 'status-completed' : 'status-pending'}">
                ${report.status}
            </span>
        </div>
    `).join('');
}

// Toggle edit mode
function toggleEditMode() {
    infoView.classList.toggle('hidden');
    editForm.classList.toggle('active');
}

// Event Listeners
editBtn.addEventListener('click', toggleEditMode);

cancelBtn.addEventListener('click', () => {
    // Reset form values
    nameInput.value = userData.name;
    phoneInput.value = userData.phone;
    emailInput.value = userData.email;
    toggleEditMode();
});

saveBtn.addEventListener('click', () => {
    // Validate inputs
    if (!nameInput.value || !phoneInput.value || !emailInput.value) {
        alert('Semua field harus diisi');
        return;
    }

    // Update user data
    userData.name = nameInput.value;
    userData.phone = phoneInput.value;
    userData.email = emailInput.value;

    // Update view
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userPhone').textContent = userData.phone;
    document.getElementById('userEmail').textContent = userData.email;

    toggleEditMode();
    alert('Data berhasil disimpan!');
});

logoutBtn.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        alert('Anda telah berhasil keluar');
        window.location.href = '../../../index.html';
    }
});

// Navigation
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'homeNav') {
            window.location.href = 'beranda.html';
        } else if (btn.id === 'monitoringNav') {
            window.location.href = 'monitoring.html';
        } else if (btn.id === 'userNav') {
            // Already on user page
            return;
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeUserData();

    // Set active nav button
    const currentPage = window.location.pathname.split('/').pop();
    navButtons.forEach(btn => {
        if (btn.id === 'userNav') {
            btn.classList.add('active');
        }
    });
});
