import { useState } from "react";
import { completeAdminRegistration } from "../api";
import { User, Phone, MapPin, Lock, Image, Upload } from 'lucide-react';

const CompleteAdminRegistration = ({ email }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", email);
      data.append("contactNumber", formData.contactNumber);
      data.append("address", formData.address);
      data.append("password", formData.password);
      data.append("avatar", formData.avatar || new Blob());
      data.append("coverImage", formData.coverImage || new Blob());

      await completeAdminRegistration(data);
      window.location.href = "https://pravartak-hawk.netlify.app";
    } catch (error) {
      console.error("Error completing admin registration:", error);
      window.location.href = "https://pravartak-hawk.netlify.app";
    }
  };

  const CustomInput = ({ icon: Icon, label, type, name, value, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg 
                    text-white placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-200"
        />
      </div>
    </div>
  );

  const CustomFileUpload = ({ icon: Icon, label, name }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200">
        {label}
      </label>
      <div className="relative">
        <div className="w-full p-4 bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg
                      hover:border-blue-500 transition-all duration-200">
          <input
            type="file"
            name={name}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-center space-x-2 text-slate-400">
            <Icon className="h-5 w-5" />
            <span>{formData[name] ? formData[name].name : `Upload ${label}`}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 p-4">
      <div className="w-full max-w-xl bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700/50">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white text-center">
            Complete Registration
          </h1>
          <p className="text-slate-400 text-center mt-2">
            Please fill in your details to complete the registration
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <CustomInput
            icon={User}
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="Enter your full name"
          />

          <CustomInput
            icon={Phone}
            label="Contact Number"
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            placeholder="Enter your contact number"
          />

          <CustomInput
            icon={MapPin}
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            placeholder="Enter your address"
          />

          <CustomInput
            icon={Lock}
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
          />

          <CustomFileUpload
            icon={Image}
            label="Avatar (Logo)"
            name="avatar"
          />

          <CustomFileUpload
            icon={Upload}
            label="Cover Image"
            name="coverImage"
          />

          {error && (
            <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/50 text-red-300">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700/50">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg font-medium
                     bg-gradient-to-r from-blue-600 to-blue-700
                     hover:from-blue-500 hover:to-blue-600
                     text-white transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Completing Registration...</span>
              </div>
            ) : (
              "Complete Registration"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteAdminRegistration;