document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.querySelector("#nhanvien-tbody");
  const form = document.querySelector("#addModal form");
  const inputs = form.querySelectorAll("input");
  const searchInput = document.querySelector("#search-ten");
  const exportBtn = document.querySelector("#btn-export");

  let sortOrder = { field: null, asc: true };

  function renderTable(data = nhanVienData) {
    tbody.innerHTML = "";
    data.forEach((nv) => {
      tbody.innerHTML += `
        <tr>
          <td><input type="checkbox"></td>
          <td class="text-center">
            <div class="d-inline-flex action-buttons">
              <button class="btn btn-sm btn-primary">✏</button>
              <button class="btn btn-sm btn-warning">👁</button>
              <button class="btn btn-sm btn-danger">🗑</button>
            </div>
          </td>
          <td>${nv.stt}</td>
          <td>${nv.ten}</td>
          <td>${nv.hoDem}</td>
          <td>${nv.diaChi}</td>
          <td>${nv.hoatDong ? "✅" : "❌"}</td>
        </tr>`;
    });
  }
  renderTable();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let ten = inputs[0].value.trim();
    let hoDem = inputs[1].value.trim();
    let diaChi = inputs[2].value.trim();

    let error = "";
    if (!ten || !hoDem || !diaChi) error = "⚠️ Vui lòng nhập đầy đủ thông tin.";
    else if (ten.length > 15) error = "⚠️ Tên không được vượt quá 15 ký tự.";
    else if (hoDem.length > 20) error = "⚠️ Họ đệm không được vượt quá 20 ký tự.";
    else if (diaChi.length > 50) error = "⚠️ Địa chỉ không được vượt quá 50 ký tự.";

    if (error) return alert(error);

    nhanVienData.push({ stt: nhanVienData.length + 1, ten, hoDem, diaChi, hoatDong: Math.random() > 0.5 });
    renderTable();
    alert("✅ Thêm nhân viên thành công!");
    form.reset();
    document.querySelector("#addModal .btn-close").click();
  });

  searchInput.addEventListener("input", function () {
    const kw = this.value.toLowerCase();
    renderTable(nhanVienData.filter(nv => nv.ten.toLowerCase().includes(kw)));
  });

  exportBtn.addEventListener("click", function () {
    let csv = "STT,Tên,Họ đệm,Địa chỉ,Hoạt động\n";
    nhanVienData.forEach(nv => csv += `${nv.stt},${nv.ten},${nv.hoDem},${nv.diaChi},${nv.hoatDong ? "Đang hoạt động" : "Ngưng"}\n`);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "nhanvien.csv";
    link.click();
  });

  function sortTable(field) {
    if (sortOrder.field === field) sortOrder.asc = !sortOrder.asc;
    else { sortOrder.field = field; sortOrder.asc = true; }
    nhanVienData.sort((a, b) => (a[field] > b[field] ? 1 : -1) * (sortOrder.asc ? 1 : -1));
    renderTable();
  }
  document.querySelectorAll("th.sortable").forEach(th => th.addEventListener("click", () => sortTable(th.dataset.field)));
});
