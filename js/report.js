function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById("location").innerText = 
                `Lokasi: ${position.coords.latitude}, ${position.coords.longitude}`;
        });
    } else {
        alert("GPS tidak didukung di browser ini.");
    }
}

function submitReport() {
    const type = document.getElementById("reportType").value;
    const description = document.getElementById("description").value;
    const media = document.getElementById("mediaUpload").files[0];

    if (!description) {
        alert("Deskripsi kejadian harus diisi.");
        return;
    }

    alert(`Laporan ${type} berhasil dikirim!`);
}
