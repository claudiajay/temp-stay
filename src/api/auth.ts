import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; 

// Register user
export async function register(user: { name: string; email: string; password: string ; userType?: 'Guest' | 'Host' | string;}) {
  const res = await axios.post(`${API_URL}/register`, user);
  return res.data;
}

// Login user
export async function login(credentials: { email: string; password: string }) {
  const res = await axios.post(`${API_URL}/login`, credentials);
  // Store token in localStorage (optional)
  localStorage.setItem("token", res.data);
  return res.data;
}

// Request password reset
export async function requestPasswordReset(email: string) {
  const res = await axios.post(`${API_URL}/reset-request?email=${email}`);
  return res.data;
}

// Reset password
export async function resetPassword(token: string, newPassword: string) {
  const res = await axios.post(`${API_URL}/reset`, { token, newPassword });
  return res.data;
}
