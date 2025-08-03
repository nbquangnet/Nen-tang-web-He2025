document.addEventListener("DOMContentLoaded", () => {
  renderTable();

  const form = document.getElementById("formAdd");
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const kh = document.getElementById("inputKH").value.trim();
    const nv = document.getElementById("inputNV").value.trim();
    const st = document.getElementById("inputST").value.trim();

    if (!kh || !nv || !st) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (kh.length > 30) {
      alert("Tên khách hàng không được vượt quá 30 ký tự!");
      return;
    }
    if (nv.length > 30) {
      alert("Tên nhân viên không được vượt quá 30 ký tự!");
      return;
    }

    const newGD = {
      id: Math.floor(Math.random() * 9000) + 1000,
      khachHang: kh,
      nhanVien: nv,
      soTien: parseInt(st),
      ngayMua: new Date().toLocaleString("vi-VN")
    };

    giaoDich.push(newGD);
    renderTable();

    alert("Thêm giao dịch thành công!");
    form.reset();
  });
});

