import axios from 'axios';

// Ready for future integration; the landing page uses local demo data only.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
