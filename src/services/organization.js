import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Use the backend base URL
    withCredentials: true,
});

// Organization Registration
export const initiateOrganizationRegistration = async (data) => {
    return await api.post('/register-organization/initiate', data);
};

export const verifyOrganizationOTP = async (data) => {
    return await api.post('/register-organization/verify-otp', data);
};

export const completeOrganizationRegistration = async (data) => {
    return await api.post('/register-organization/complete', data);
};

export const resendOrganizationOTP = async (data) => {
    return await api.post('/register-organization/resend-otp', data);
};

// Organization Login
export const loginOrganization = async (data) => {
    return await api.post('/login', data);
};

// Organization Management
export const logoutOrganization = async () => {
    return await api.post('/logout');
};

export const getOrganizationDetails = async () => {
    return await api.get('/details');
};

export const addUsersInOrganization = async (data) => {
    return await api.post('/add-users', data);
};

export const updateAccountDetails = async (data) => {
    return await api.post('/update-details', data);
};

export const updatePassword = async (data) => {
    return await api.post('/update-pass', data);
};
