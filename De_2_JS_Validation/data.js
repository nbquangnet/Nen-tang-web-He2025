const giaoDich = [
  { id: 1102, khachHang: "Vũ Hoài An", nhanVien: "Mai Thục Anh", soTien: 250000, ngayMua: "06 Tháng 6 2024 9:00" },
  { id: 1199, khachHang: "Hoàng Thị Thắng", nhanVien: "Nguyễn Văn Hồng", soTien: 600000, ngayMua: "06 Tháng 6 2024 9:03" },
  { id: 1239, khachHang: "Nguyễn Huy Quang", nhanVien: "Nguyễn Văn Hồng", soTien: 934000, ngayMua: "06 Tháng 6 2024 9:10" },
  { id: 1677, khachHang: "Huỳnh Văn Nam", nhanVien: "Mai Thục Anh", soTien: 150000, ngayMua: "06 Tháng 6 2024 9:20" },
  { id: 1439, khachHang: "Nguyễn Hồng Minh", nhanVien: "Mai Thục Anh", soTien: 354000, ngayMua: "06 Tháng 6 2024 9:24" }
];

function renderTable() {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";
  giaoDich.forEach(gd => {
    tbody.innerHTML += `
      <tr>
        <td><input type="checkbox"></td>
        <td>
          <button class="btn btn-sm btn-primary me-1">✏</button>
          <button class="btn btn-sm btn-warning me-1">👁</button>
          <button class="btn btn-sm btn-danger">🗑</button>
        </td>
        <td>${gd.id}</td>
        <td>${gd.khachHang}</td>
        <td>${gd.nhanVien}</td>
        <td>${gd.soTien.toLocaleString("vi-VN")}</td>
        <td>${gd.ngayMua}</td>
      </tr>
    `;
  });
}
