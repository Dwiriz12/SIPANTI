const dataAnak = [
    {
        id: 1,
        nama: "Dina April",
        usia: 16,
        jenisKelamin: "Perempuan",
        pendidikan: "SMP Negeri 1 Bandung",
        kelas: "VIII",
        status: "Aktif",
        foto: "foto anak/Dina April.png",
        detail: "detail-anak-Dina.html"
    },

    {
        id: 2,
        nama: "Andi Prasetyo",
        usia: 17,
        jenisKelamin: "Laki-laki",
        pendidikan: "SMA Negeri 1 Bandung",
        kelas: "XI",
        status: "Aktif",
        foto: "foto anak/Andi Prasetyo.png",
        detail: "detail-anak-Andi.html"
    },

    {
        id: 3,
        nama: "Farendra Alfiansyah",
        usia: 17,
        jenisKelamin: "Laki-laki",
        pendidikan: "SMA Negeri 2 Bandung",
        kelas: "XII",
        status: "Aktif",
        foto: "foto anak/Farendra Alfiansyah.png",
        detail: "detail-anak-Farendra.html"
    }
];

function renderAnak(data) {
    const anakList = document.getElementById("anakList");
    let html = "";

    for (let i = 0; i < data.length; i++) {
        html += `
            <div class="card anak-card">
                <div class="card-body d-flex flex-column flex-sm-row align-items-sm-center gap-3">

                    <img src="${data[i].foto}" alt="Foto ${data[i].nama}" class="anak-photo">

                    <div class="anak-info flex-grow-1">
                        <h3 class="anak-name">${data[i].nama}</h3>
                        <p class="anak-meta">${data[i].usia} Tahun &nbsp;|&nbsp; ${data[i].jenisKelamin}</p>
                        <p class="anak-meta">${data[i].pendidikan}</p>
                        <p class="anak-meta">Kelas: ${data[i].kelas}</p>
                    </div>

                    <div class="anak-action d-flex flex-row flex-sm-column align-items-sm-end gap-2">
                        <span class="badge badge-status">${data[i].status}</span>
                        <a href="${data[i].detail}" class="btn btn-outline-secondary">Detail</a>
                    </div>

                </div>
            </div>
        `;
    }

    anakList.innerHTML = html;
}

function hitungStatistik(data) {
    let total = 0;
    let aktif = 0;
    let alumni = 0;

    for (let i = 0; i < data.length; i++) {
        total++;

        if (data[i].status === "Aktif") {
            aktif++;
        } else if (data[i].status === "Alumni") {
            alumni++;
        }
    }

    document.getElementById("statTotal").textContent = total;
    document.getElementById("statAktif").textContent = aktif;
    document.getElementById("statAlumni").textContent = alumni;
    document.getElementById("dataCount").textContent = "Menampilkan 1-" + total + " dari " + total + " data";
}

let statusFilter = "Semua";
let kataKunci = "";

function filterAnak() {
    const hasil = [];

    for (let i = 0; i < dataAnak.length; i++) {
        const cocokNama = dataAnak[i].nama.toLowerCase().includes(kataKunci.toLowerCase());
        let cocokStatus = false;

        if (statusFilter === "Semua") {
            cocokStatus = true;
        } else if (statusFilter === "Lainnya") {
            cocokStatus = dataAnak[i].status !== "Aktif" && dataAnak[i].status !== "Alumni";
        } else {
            cocokStatus = dataAnak[i].status === statusFilter;
        }

        if (cocokNama && cocokStatus) {
            hasil.push(dataAnak[i]);
        }
    }

    renderAnak(hasil);

    const dataCount = document.getElementById("dataCount");
    if (hasil.length === 0) {
        dataCount.textContent = "Tidak ada data yang cocok";
    } else {
        dataCount.textContent = "Menampilkan 1-" + hasil.length + " dari " + dataAnak.length + " data";
    }
}

const inputCari = document.getElementById("inputCari");

inputCari.addEventListener("input", function () {
    kataKunci = inputCari.value;
    filterAnak();
});

document.getElementById("btnCari").addEventListener("click", function () {
    kataKunci = inputCari.value;
    filterAnak();
});

const semuaChip = document.querySelectorAll(".filter-chips .chip");

semuaChip.forEach(function (chip) {
    chip.addEventListener("click", function () {
        semuaChip.forEach(function (c) {
            c.classList.remove("active");
        });

        chip.classList.add("active");
        statusFilter = chip.textContent.trim();
        filterAnak();
    });
});

renderAnak(dataAnak);
hitungStatistik(dataAnak);
