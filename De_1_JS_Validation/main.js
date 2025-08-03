const tbody = document.getElementById("employee-table");
const entriesInfo = document.getElementById("entries-info");

// ✅ Load dữ liệu từ data.js vào bảng
function loadEmployees() {
  tbody.innerHTML = "";
  employees.forEach(emp => {
    tbody.innerHTML += `
      <tr>
        <td><input type="checkbox"></td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <button class="icon edit">✏️</button>
          <button class="icon delete">🗑️</button>
        </td>
      </tr>
    `;
  });

  // ✅ Update thông tin entries
  entriesInfo.textContent = `Showing ${employees.length} out of ${employees.length} entries`;
}
loadEmployees();

// ✅ Validate input
function validateInput(name, email, address, phone) {
  if (!name || !email || !address || !phone) return "⚠️ All fields are required!";
  const phoneRegex = /^0\d{9}$/;
  if (!phoneRegex.test(phone)) return "⚠️ Phone must be 10 digits and start with 0!";
  return "";
}

// ✅ Thêm nhân viên mới
function addEmployee() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const errorMsg = document.getElementById("error-msg");

  const error = validateInput(name, email, address, phone);
  if (error) {
    errorMsg.textContent = error;
    return;
  }

  employees.push({ id: employees.length + 1, name, email, address, phone });
  loadEmployees();
  closeForm();
}
