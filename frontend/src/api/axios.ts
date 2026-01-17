import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7161/api", // ajusta si usas http
});

// Simulación de usuario (CAMBIAR entre 1 y 2)
api.interceptors.request.use((config) => {
  config.headers["X-User-Id"] = "2"; // 1 = Employee, 2 = Manager
  return config;
});

export default api;
