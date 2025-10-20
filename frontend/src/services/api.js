// API service for backend integration
// This file will be used when the backend is ready

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Generic API call method
  async apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // User CRUD operations
  async getUsers() {
    return this.apiCall('/users');
  }

  async getUser(id) {
    return this.apiCall(`/users/${id}`);
  }

  async createUser(userData) {
    return this.apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.apiCall(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export a singleton instance
export default new ApiService();
