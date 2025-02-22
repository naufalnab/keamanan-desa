
const reports = [
    { id: 1, type: "Keamanan", date: "21 Feb 2024", status: "Selesai" },
    { id: 2, type: "Darurat", date: "15 Feb 2024", status: "Diproses" },
    { id: 3, type: "Lingkungan", date: "10 Feb 2024", status: "Selesai" }
];

document.addEventListener('DOMContentLoaded', () => {
    const reportList = document.getElementById('reportList');
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.id === 'userNav') {
                window.location.href = 'user.html';
            } else if (btn.id === 'homeNav') {
                window.location.href = 'beranda.html';
            } else if (btn.id === 'monitoringNav') {
                // Already on the monitoring page, do nothing
                return;
            }
        });
    });
    reportList.innerHTML = reports.map(report => `
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
});