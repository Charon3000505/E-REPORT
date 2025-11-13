const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const applyFilterBtn = document.getElementById("applyFilter");
const clearBtn = document.getElementById('clearFilter');
const container = document.getElementById('reportList');

let reports = JSON.parse(localStorage.getItem('reports')) || [];

// ====== Load & Render Laporan ======
function loadReports() {
  reports = JSON.parse(localStorage.getItem('reports')) || [];
  renderReports(reports);
}

function renderReports(reportsToRender) {
  container.innerHTML = '';
  if(reportsToRender.length === 0){
    container.innerHTML = '<p class="text-muted">Belum ada laporan.</p>';
    return;
  }

  reportsToRender.forEach(r => {
    container.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm">
          ${r.image ? `<img src="${r.image}" class="card-img-top" alt="Foto Laporan">` : ''}
          <div class="card-body">
            <h5 class="card-title">${r.name}</h5>
            <p class="card-text text-truncate">${r.description}</p>
            <small class="text-muted">Dikirim: ${r.waktu ? r.waktu : '-'}</small><br>
            <span class="badge bg-${r.status === 'Selesai' ? 'success' : r.status === 'Diproses' ? 'warning' : 'secondary'}">${r.status}</span>
            <div class="mt-3 d-flex justify-content-between">
              <a href="report-detail.html?id=${r.id}" class="btn btn-sm btn-primary">Detail</a>
              <button class="btn btn-sm btn-danger" onclick="deleteReport(${r.id})">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// ====== Filter Laporan ======
function applyFilter() {
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterStatus.value;

  const filtered = reports.filter(r =>
    r.name.toLowerCase().includes(searchValue) &&
    (filterValue === "" || r.status === filterValue)
  );

  document.getElementById("filterStatusInfo").innerText =
    `Filter diterapkan: ${filtered.length} laporan ditemukan`;

  renderReports(filtered);
}

applyFilterBtn.addEventListener('click', applyFilter);

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterStatus.value = '';
  document.getElementById("filterStatusInfo").innerText = '';
  loadReports();
});

// ====== Hapus Laporan ======
function deleteReport(id) {
  if(!confirm("Yakin ingin menghapus laporan ini?")) return;

  reports = reports.filter(r => r.id !== id);
  localStorage.setItem('reports', JSON.stringify(reports));
  alert("Laporan berhasil dihapus!");
  loadReports();
}

// ====== Tambah Laporan Baru (contoh penggunaan addReport) ======
function addReport(name, description, image, status) {
  reports = JSON.parse(localStorage.getItem('reports')) || [];

  const now = new Date();
  const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const waktu = now.toLocaleString('id-ID', options);

  const id = reports.length > 0 ? reports[reports.length - 1].id + 1 : 1;

  reports.push({ id, name, description, image, status, waktu });
  localStorage.setItem('reports', JSON.stringify(reports));
  loadReports();
}

// ====== Load Awal ======
loadReports();





  
