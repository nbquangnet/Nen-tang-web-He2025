const form = document.getElementById("studentForm");
const maSVInput = document.getElementById("maSV");
const hoTenInput = document.getElementById("hoTen");
const lopInput = document.getElementById("lop");
const btnThem = document.getElementById("btnThem");
const btnCapNhat = document.getElementById("btnCapNhat");
const bang = document.getElementById("bangSinhVien").getElementsByTagName("tbody")[0];
const thongBao = document.getElementById("thongBao");

let editingRow = null;

// ✅ Hiển thị thông báo với màu tùy chỉnh
function hienThongBao(msg, color = "green") {
  thongBao.innerText = msg;
  thongBao.style.color = color;
  setTimeout(() => (thongBao.innerText = ""), 3000);
}

// ✅ Sự kiện Submit (Thêm / Cập nhật)
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const maSV = maSVInput.value.trim();
  const hoTen = hoTenInput.value.trim();
  const lop = lopInput.value.trim();

  // 🔹 Validation nâng cao
  if (!/^[A-Za-z0-9]{3,10}$/.test(maSV)) {
    hienThongBao("⚠️ Mã SV phải từ 3-10 ký tự, không chứa ký tự đặc biệt!", "red");
    return;
  }
  if (!/^[A-Za-zÀ-ỹ\s]{3,}$/.test(hoTen)) {
    hienThongBao("⚠️ Họ tên không hợp lệ!", "red");
    return;
  }
  if (lop.length < 2) {
    hienThongBao("⚠️ Tên lớp không hợp lệ!", "red");
    return;
  }

  if (editingRow) {
    suaDong(editingRow, maSV, hoTen, lop);
    hienThongBao("✅ Cập nhật thành công!", "mediumseagreen");
  } else {
    themDong(maSV, hoTen, lop);
    hienThongBao("✔️ Thêm sinh viên thành công!", "green");
  }

  form.reset();
  editingRow = null;
  btnThem.style.display = "inline-block";
  btnCapNhat.style.display = "none";
});

function themDong(maSV, hoTen, lop) {
  const row = bang.insertRow();
  row.innerHTML = `
    <td>${maSV}</td>
    <td>${hoTen}</td>
    <td>${lop}</td>
    <td>
      <button class="btn-sua" onclick="suaSinhVien(this)">Sửa</button>
      <button class="btn-xoa" onclick="xoaSinhVien(this)">Xóa</button>
    </td>
  `;
}

function suaSinhVien(btn) {
  editingRow = btn.closest("tr");
  const cells = editingRow.getElementsByTagName("td");
  maSVInput.value = cells[0].innerText;
  hoTenInput.value = cells[1].innerText;
  lopInput.value = cells[2].innerText;

  btnThem.style.display = "none";
  btnCapNhat.style.display = "inline-block";
  thongBao.innerText = "";
}

function suaDong(row, maSV, hoTen, lop) {
  row.cells[0].innerText = maSV;
  row.cells[1].innerText = hoTen;
  row.cells[2].innerText = lop;
}

function xoaSinhVien(btn) {
  if (confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
    const row = btn.closest("tr");
    row.remove();
    hienThongBao("🗑️ Đã xóa sinh viên!", "crimson");

    if (editingRow === row) {
      editingRow = null;
      form.reset();
      btnThem.style.display = "inline-block";
      btnCapNhat.style.display = "none";
    }
  }
}
