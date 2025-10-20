import React from 'react';
import '../styles/UserList.css';

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="no-users">
        <h3>No users found</h3>
        <p>Add some users to get started!</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>Users List</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(user)}
                      className="btn btn-success btn-sm"
                      title="Edit user"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="btn btn-danger btn-sm"
                      title="Delete user"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
