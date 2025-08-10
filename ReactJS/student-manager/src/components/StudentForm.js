import React, { useState, useEffect } from 'react';

function StudentForm({ onAdd, onUpdate, editingStudent, onCancel }) {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setStudentId(editingStudent.studentId);
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setMajor(editingStudent.major);
      setYear(editingStudent.year.toString());
    } else {
      setStudentId('');
      setName('');
      setEmail('');
      setMajor('');
      setYear('');
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!studentId || !name || !email || !major || !year) {
      alert('Vui lòng nhập đầy đủ thông tin sinh viên!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email không hợp lệ!');
      return;
    }

    if (editingStudent) {
      onUpdate({
        ...editingStudent,
        studentId,
        name,
        email,
        major,
        year: parseInt(year, 10),
      });
    } else {
      const newStudent = {
        id: Date.now(),
        studentId,
        name,
        email,
        major,
        year: parseInt(year, 10),
      };
      onAdd(newStudent);
    }

    setStudentId('');
    setName('');
    setEmail('');
    setMajor('');
    setYear('');
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Sửa Thông Tin Sinh Viên' : 'Thêm Sinh Viên'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Mã sinh viên:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Ví dụ: SV001"
              disabled={editingStudent} 
            />
          </div>
          
          <div className="form-group">
            <label>Họ và tên:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên"
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
            />
          </div>
          
          <div className="form-group">
            <label>Chuyên ngành:</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="">Chọn chuyên ngành</option>
              <option value="Công nghệ thông tin">Công nghệ thông tin</option>
              <option value="Khoa học máy tính">Khoa học máy tính</option>
              <option value="Kỹ thuật phần mềm">Kỹ thuật phần mềm</option>
              <option value="An toàn thông tin">An toàn thông tin</option>
              <option value="Trí tuệ nhân tạo">Trí tuệ nhân tạo</option>
              <option value="Kỹ thuật điện">Kỹ thuật điện</option>
              <option value="Kỹ thuật cơ khí">Kỹ thuật cơ khí</option>
              <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Năm học:</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Chọn năm học</option>
              <option value="1">Năm 1</option>
              <option value="2">Năm 2</option>
              <option value="3">Năm 3</option>
              <option value="4">Năm 4</option>
              <option value="5">Năm 5</option>
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? '🔄 Cập nhật' : '➕ Thêm sinh viên'}
          </button>
          
          {editingStudent && (
            <button 
              type="button" 
              onClick={onCancel}
              className="btn btn-secondary"
            >
              ❌ Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;