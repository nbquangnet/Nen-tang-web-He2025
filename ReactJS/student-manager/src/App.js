import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      studentId: 'SV001', 
      name: 'Nguyễn Văn An', 
      email: 'an.nguyen@example.com', 
      major: 'Công nghệ thông tin', 
      year: 3 
    },
    { 
      id: 2, 
      studentId: 'SV002', 
      name: 'Trần Thị Bình', 
      email: 'binh.tran@example.com', 
      major: 'Khoa học máy tính', 
      year: 2 
    },
    { 
      id: 3, 
      studentId: 'SV003', 
      name: 'Lê Văn Cường', 
      email: 'cuong.le@example.com', 
      major: 'Kỹ thuật phần mềm', 
      year: 4 
    },
    { 
      id: 3, 
      studentId: 'SV004', 
      name: 'Nguyễn Bảo Quang', 
      email: 'quang.nguyen@example.com', 
      major: 'An toàn thông tin', 
      year: 3
    }
  ]);
  
  const [editingStudent, setEditingStudent] = useState(null);

  const isStudentIdExists = (studentId, excludeId = null) => {
    return students.some(student => 
      student.studentId === studentId && student.id !== excludeId
    );
  };

  const handleAddStudent = (newStudent) => {
    if (isStudentIdExists(newStudent.studentId)) {
      alert('Mã sinh viên đã tồn tại! Vui lòng chọn mã khác.');
      return;
    }
    setStudents(prevStudents => [...prevStudents, newStudent]);
    alert('Thêm sinh viên thành công! 🎉');
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditingStudent(null);
    alert('Cập nhật thông tin sinh viên thành công! ✅');
  };

  const handleDeleteStudent = (id) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    alert('Xóa sinh viên thành công! 🗑️');
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎓 Hệ Thống Quản Lý Sinh Viên</h1>
          <p>Quản lý thông tin sinh viên một cách dễ dàng và hiệu quả</p>
        </header>

        <div className="stats">
          <div className="stat-card blue">
            <h3>{students.length}</h3>
            <p>Tổng sinh viên</p>
          </div>
          <div className="stat-card green">
            <h3>{students.filter(s => s.year === 1).length}</h3>
            <p>Sinh viên năm 1</p>
          </div>
          <div className="stat-card purple">
            <h3>{students.filter(s => s.major === 'Công nghệ thông tin').length}</h3>
            <p>Ngành CNTT</p>
          </div>
          <div className="stat-card orange">
            <h3>{students.filter(s => s.year === 4).length}</h3>
            <p>Sinh viên năm 4</p>
          </div>
        </div>

        <StudentForm
          onAdd={handleAddStudent}
          onUpdate={handleUpdateStudent}
          editingStudent={editingStudent}
          onCancel={() => setEditingStudent(null)}
        />

        <StudentList
          students={students}
          onEdit={handleEditClick}
          onDelete={handleDeleteStudent}
        />

        <footer className="footer">
          <p>Bài tập thực hành số 4</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
