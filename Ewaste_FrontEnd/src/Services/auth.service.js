import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const register = (name, email, roleName) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    roleName
  });
};

const login = (email) => {
  return axios.post(`${API_URL}/login`, {
    email
  });
};

const setCurrentUser = (user) => {
  // Normalize role for frontend if needed (UI uses .role, backend returns .roleName)
  if (user && user.roleName && !user.role) {
    user.role = user.roleName.toLowerCase();
  }
  localStorage.setItem("user", JSON.stringify(user));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
  localStorage.removeItem("user");
};

// ADDED FOR ADMIN DASHBOARD (Mocked because backend lacks this endpoint)
const getAllUsers = () => {
  // Try to get from localStorage or return mock
  const existing = JSON.parse(localStorage.getItem("all_users_mock")) || [
    { id: 1, fullName: "Varad Patil", email: "varad@gmail.com", regDate: "2024-03-20", status: "Approved" },
    { id: 2, fullName: "Tejas Shinde", email: "tejas@gmail.com", regDate: "2024-03-21", status: "Pending" },
    { id: 3, fullName: "John Doe", email: "john@example.com", regDate: "2024-03-22", status: "Pending" }
  ];
  return existing;
};

export default {
  register,
  login,
  setCurrentUser,
  getCurrentUser,
  logout,
  getAllUsers
};
