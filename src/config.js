// Api base url
const API_BASE_URL = "http://localhost:5000/api";

// Doctors api
const DOCTORS = {
    LIST: (page , limit) => `${API_BASE_URL}/doctors?page=${page}&limit=${limit}`,
    GET: (id) => `${API_BASE_URL}/doctors/${id}`,
    CREATE: `${API_BASE_URL}/doctors`,
    UPDATE: (id) => `${API_BASE_URL}/doctors/${id}`,
};

export { DOCTORS };