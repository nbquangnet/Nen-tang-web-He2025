import React from 'react';

function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="list-container">
        <h2>📋 Danh sách sinh viên</h2>
        <div className="empty-state">
          <div className="empty-icon">👨‍🎓</div>
          <p>Chưa có sinh viên nào trong hệ thống</p>
          <small>Hãy thêm sinh viên đầu tiên!</small>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2>📋 Danh sách sinh viên ({students.length} sinh viên)</h2>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Chuyên ngành</th>
              <th>Năm</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td className="student-id">{student.studentId}</td>
                <td className="student-name">{student.name}</td>
                <td className="student-email">{student.email}</td>
                <td>{student.major}</td>
                <td>Năm {student.year}</td>
                <td className="actions">
                  <button
                    onClick={() => onEdit(student)}
                    className="btn btn-edit"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Bạn có chắc muốn xóa sinh viên "${student.name}" (${student.studentId})?`)) {
                        onDelete(student.id);
                      }
                    }}
                    className="btn btn-delete"
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cards-container">
        {students.map(student => (
          <div key={student.id} className="student-card">
            <div className="card-header">
              <h3>{student.studentId}</h3>
              <span className="year-badge">Năm {student.year}</span>
            </div>
            
            <h4>{student.name}</h4>
            <p>📧 {student.email}</p>
            <p>🎓 {student.major}</p>
            
            <div className="card-actions">
              <button
                onClick={() => onEdit(student)}
                className="btn btn-edit"
              >
                ✏️ Sửa
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Bạn có chắc muốn xóa sinh viên "${student.name}" (${student.studentId})?`)) {
                    onDelete(student.id);
                  }
                }}
                className="btn btn-delete"
              >
                🗑️ Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;