import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import apiService from '../services/api';
import '../styles/UserManager.css';

const UserManagerWithAPI = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const usersData = await apiService.getUsers();
      setUsers(usersData);
    } catch (error) {
      setError('Failed to load users. Please check if the backend is running.');
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newUser = await apiService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      console.log('User added:', newUser);
    } catch (error) {
      setError('Failed to add user. Please try again.');
      console.error('Error adding user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedUser = await apiService.updateUser(editingUser.id, userData);
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? updatedUser : user
      ));
      setEditingUser(null);
      console.log('User updated:', updatedUser);
    } catch (error) {
      setError('Failed to update user. Please try again.');
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await apiService.deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
      console.log('User deleted:', userId);
    } catch (error) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
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
          <p>Connected to Backend API</p>
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

export default UserManagerWithAPI;
