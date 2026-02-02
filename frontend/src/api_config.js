
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_URL = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
