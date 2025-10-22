// API service for backend integration
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // User CRUD operations
  async getUsers() {
    const response = await this.client.get('/users');
    return response.data;
  }

  async getUser(id) {
    const response = await this.client.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData) {
    const response = await this.client.post('/users', userData);
    return response.data;
  }

  async updateUser(id, userData) {
    const response = await this.client.put(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id) {
    await this.client.delete(`/users/${id}`);
  }
}

export default new ApiService();
