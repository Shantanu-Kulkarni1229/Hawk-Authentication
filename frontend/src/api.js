import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3003/api/v1/organization", // Ensure the backend URL is correct
});

export const initiateRegistration = (data) =>
  API.post("/register-organization/initiate", data);

export const verifyOTP = (data) =>
  API.post("/register-organization/verify-otp", data);

export const completeRegistration = (data) =>
  API.post("/register-organization/complete", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  export const initiateAdminRegistration = (data) =>
    API.post("/register-admin/initiate", data);
  
  export const verifyAdminOTP = (data) =>
    API.post("/register-admin/verify-otp", data);
  
  export const completeAdminRegistration = (data) =>
    API.post("/register-admin/complete", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
  