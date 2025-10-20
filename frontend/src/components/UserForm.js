import React, { useState } from 'react';
import '../styles/UserForm.css';

const UserForm = ({ onSubmit, user = null, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    age: user ? user.age : '',
    phone: user ? user.phone : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!user) {
      // Reset form only when creating new user
      setFormData({
        name: '',
        email: '',
        age: '',
        phone: ''
      });
    }
  };

  return (
    <div className="user-form-container">
      <h2>{user ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            placeholder="Enter age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {user ? 'Update User' : 'Add User'}
          </button>
          {user && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;