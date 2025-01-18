import { useState } from "react";
import { initiateRegistration, verifyAdminOTP } from "../api";
import { Mail, User, ArrowRight, KeyRound, RefreshCw } from 'lucide-react';

const InitiateRegistration = ({ onNext }) => {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.name) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await initiateRegistration(formData);
      onNext(formData.email);
    } catch (error) {
      setError(error.response?.data?.message || "Error initiating registration");
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700/50">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white text-center">
            Initiate Registration
          </h1>
          <p className="text-slate-400 text-center mt-2">
            Enter your details to get started
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <CustomInput
            icon={Mail}
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
          />

          <CustomInput
            icon={User}
            label="Name"
            type="text"
            name="name"
            onFocus={() => setFocusedInput(name)}
            onBlur={(e) => {
              // Only remove focus if the user is not clicking another input
              if (!e.relatedTarget?.matches('input')) {
                setFocusedInput(null);
              }
            }}
            value={formData.name}
            placeholder="Enter your name"
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
            className="w-full group px-4 py-2 rounded-lg font-medium
                     bg-gradient-to-r from-blue-600 to-blue-700
                     hover:from-blue-500 hover:to-blue-600
                     text-white transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};



export default InitiateRegistration;

