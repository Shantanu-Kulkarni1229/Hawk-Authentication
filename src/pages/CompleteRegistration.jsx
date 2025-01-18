import React, { useState } from "react";
import { completeRegistration } from "../api";
import { Building2, Phone, MapPin, Lock, Upload, Loader2 } from 'lucide-react';

const CompleteRegistration = ({ email, onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    address: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [previews, setPreviews] = useState({
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreviews({
        ...previews,
        [name]: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = new FormData();
      data.append("name", formData.name || "Default Name");
      data.append("email", email || "default@example.com");
      data.append("contactNumber", formData.contactNumber || "0000000000");
      data.append("address", formData.address || "Default Address");
      data.append("password", formData.password || "defaultPassword");
      data.append("avatar", formData.avatar || new Blob());
      data.append("coverImage", formData.coverImage || new Blob());

      await completeRegistration(data);
      onNext();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during registration");
      console.error("Error during registration:", error);
      onNext();
    } finally {
      setIsLoading(false);
    }
  };

  const FileUploadField = ({ label, name, preview }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          name={name}
          onChange={handleChange}
          className="hidden"
          id={name}
          accept="image/*"
        />
        <label
          htmlFor={name}
          className="relative cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors duration-200"
        >
          {preview ? (
            <img
              src={preview}
              alt={label}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-center space-y-2">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-400">Click to upload {label}</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );

  const InputWithIcon = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-gray-700">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Complete Registration</h2>
              <p className="mt-2 text-gray-400">Please fill in your organization details</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Organization Name
                </label>
                <InputWithIcon
                  icon={Building2}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Contact Number
                </label>
                <InputWithIcon
                  icon={Phone}
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Address
                </label>
                <InputWithIcon
                  icon={MapPin}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <InputWithIcon
                  icon={Lock}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FileUploadField
                  label="Organization Logo"
                  name="avatar"
                  preview={previews.avatar}
                />
                <FileUploadField
                  label="Cover Image"
                  name="coverImage"
                  preview={previews.coverImage}
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-900/50 border border-red-800 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Completing Registration...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistration;