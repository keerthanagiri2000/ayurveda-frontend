// Api base url
const API_BASE_URL = "http://localhost:5000/api";

// Doctors api
const DOCTORS = {
    LIST: (page , limit ) => `${API_BASE_URL}/doctors?page=${page}&limit=${limit}`,
    GET: (id) => `${API_BASE_URL}/doctors/${id}`,
    CREATE: `${API_BASE_URL}/doctors`,
    UPDATE: (id) => `${API_BASE_URL}/doctors/${id}`,
    GET_ACTIVE_DOCTORS: `${API_BASE_URL}/doctors/active`,
    GET_ACTIVE_DOCTORS_LIST: (page, limit, specialization, mode) => `${API_BASE_URL}/doctors/active/list?page=${page}&limit=${limit}&specialization=${specialization}&mode=${mode}`,
};

const SLOT = {
    CREATE: `${API_BASE_URL}/slots`,
    LIST: (page, limit) => `${API_BASE_URL}/slots?page=${page}&limit=${limit}`,
    AVAILABLE_DOCTOR_SLOTS: (doctorId, date) => `${API_BASE_URL}/slots/available/${doctorId}?date=${date}`,
    LOCK_SLOT: (id) => `${API_BASE_URL}/slots/${id}/lock`,
};

const AUTH = {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
};

const APPOINTMENT = {
    CREATE: `${API_BASE_URL}/appointment`,
    DASHBOARD_LIST: (userId, status) => `${API_BASE_URL}/appointment/user/${userId}?status=${status}`,
    CANCEL: (id) => `${API_BASE_URL}/appointments/${id}/cancel`,
}
export { DOCTORS, SLOT, AUTH, APPOINTMENT };