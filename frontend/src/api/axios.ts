import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7161/api", // ajusta si usas http
});

/* HEADAER FROM DATA */
export function setUserHeader(userId: number | null) {
  if (userId) {
    api.defaults.headers.common["X-User-Id"] = userId.toString();
  } else {
    delete api.defaults.headers.common["X-User-Id"];
  }
}

export default api;
