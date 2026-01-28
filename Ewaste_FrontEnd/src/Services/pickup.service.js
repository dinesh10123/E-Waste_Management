import axios from "axios";

// Using API Gateway (Port 8080)
const API_URL = "http://localhost:8080/api/pickups";

const createPickupRequest = (pickupData) => {
  return axios.post(API_URL, pickupData);
};

const getPickupRequestById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// ADDED FOR MANAGEMENT (Mocked because backend lacks this endpoint)
const getAllRequests = () => {
  return [
    {
      id: 101,
      user: { name: 'Varad Patil', email: 'varad@gmail.com', initial: 'VP', color: '#0f766e' },
      device: { name: 'Laptop', model: 'Dell XPS 15' },
      condition: 'Working',
      qty: 1,
      location: 'Pune, Maharashtra',
      submitted: '2024-03-22',
      status: 'ACCEPTED'
    },
    {
      id: 102,
      user: { name: 'Tejas Shinde', email: 'tejas@gmail.com', initial: 'TS', color: '#1d4ed8' },
      device: { name: 'Mobile', model: 'iPhone 13' },
      condition: 'Damaged',
      qty: 2,
      location: 'Mumbai, Maharashtra',
      submitted: '2024-03-24',
      status: 'PICKED_UP'
    }
  ];
};

export default {
  createPickupRequest,
  getPickupRequestById,
  getAllRequests
};