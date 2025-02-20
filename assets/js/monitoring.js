document.addEventListener("DOMContentLoaded", function () {
    const reports = [
        { type: "Pencurian", lat: -6.200000, lng: 106.816666, severity: "high", time: "10 Menit yang lalu" },
        { type: "Kebakaran", lat: -6.210000, lng: 106.826666, severity: "medium", time: "30 Menit yang lalu" },
        { type: "Banjir", lat: -6.190000, lng: 106.806666, severity: "high", time: "1 Jam yang lalu" },
        { type: "Kekerasan", lat: -6.185000, lng: 106.816666, severity: "medium", time: "2 Jam yang lalu" },
        { type: "Petir", lat: -6.195000, lng: 106.826666, severity: "low", time: "3 Jam yang lalu" }
    ];

    // Inisialisasi Peta
    var map = L.map("map").setView([-6.200000, 106.816666], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // Tambahkan marker ke peta
    reports.forEach(report => {
        let color = report.severity === "high" ? "red" : report.severity === "medium" ? "orange" : "green";

        L.circleMarker([report.lat, report.lng], {
            color: color,
            radius: 10,
            fillOpacity: 0.7
        })
        .bindPopup(`<strong>${report.type}</strong><br>${report.time}`)
        .addTo(map);
    });

    // Tampilkan riwayat laporan
    const reportList = document.getElementById("reportList");
    reports.forEach(report => {
        const div = document.createElement("div");
        div.classList.add("report-item");
        div.innerHTML = `
            <span>${report.type} - ${report.time}</span>
            <span class="severity-${report.severity}">${report.severity.toUpperCase()}</span>
        `;
        reportList.appendChild(div);
    });
});
