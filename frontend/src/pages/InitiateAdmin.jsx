import { useState } from "react";
import { initiateAdminRegistration } from "../api";
import { Mail } from "lucide-react";

const InitiateAdmin = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter the admin's email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await initiateAdminRegistration({ email });
      onNext(email);
    } catch (error) {
      console.error("Error initiating admin registration:", error);
      setError(error.response?.data?.message || "Error initiating admin registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700/50">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white mb-2">
            Admin Registration
          </h1>
          <p className="text-slate-400 text-sm">
            Enter the email address to register a new admin
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-slate-200"
            >
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg 
                          text-white placeholder:text-slate-400
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
              />
            </div>
          </div>
          
          {/* Error Message */}
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
            className="w-full px-4 py-2 rounded-lg font-medium
                     bg-gradient-to-r from-blue-600 to-blue-700
                     hover:from-blue-500 hover:to-blue-600
                     text-white transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending OTP...</span>
              </div>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitiateAdmin;