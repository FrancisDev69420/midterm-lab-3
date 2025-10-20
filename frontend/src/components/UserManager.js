import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import '../styles/UserManager.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for demonstration (replace with API calls later)
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 25, phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30, phone: '098-765-4321' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, phone: '555-123-4567' }
    ];
    setUsers(mockUsers);
  }, []);

  // API functions (to be connected to backend later)
  const apiCall = async (url, options = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For now, simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Replace with actual API calls when backend is ready
      // const response = await fetch(url, options);
      // if (!response.ok) throw new Error('API call failed');
      // return await response.json();
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await apiCall('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      // For now, add to local state
      const newUser = {
        id: Date.now(), // Temporary ID
        ...userData
      };
      setUsers(prev => [...prev, newUser]);
      
      console.log('User added:', newUser);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (userData) => {
    try {
      await apiCall(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      // For now, update local state
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userData }
          : user
      ));
      
      setEditingUser(null);
      console.log('User updated:', userData);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await apiCall(`/api/users/${userId}`, {
        method: 'DELETE'
      });

      // For now, remove from local state
      setUsers(prev => prev.filter(user => user.id !== userId));
      console.log('User deleted:', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="user-manager">
      <div className="container">
        <header className="app-header">
          <h1>User Management System</h1>
          <p>Manage your users with CRUD operations</p>
        </header>

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        <UserForm
          onSubmit={editingUser ? handleEditUser : handleAddUser}
          user={editingUser}
          onCancel={handleCancelEdit}
        />

        <UserList
          users={users}
          onEdit={handleEditClick}
          onDelete={handleDeleteUser}
        />

        <footer className="app-footer">
          <p>MIDTERM LABORATORY 3 ITP110 – WEB TECHNOLOGIES</p>
        </footer>
      </div>
    </div>
  );
};

export default UserManager;
