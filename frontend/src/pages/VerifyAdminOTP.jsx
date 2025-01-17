import { useState, useCallback } from "react";
import { verifyAdminOTP } from "../api";
import { Mail, KeyRound, RefreshCcw } from 'lucide-react';

const VerifyAdminOTP = ({ email, onNext }) => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyAdminOTP({ email, otp });
      onNext();
    } catch (error) {
      setError(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      await verifyAdminOTP({ email });
      setError("OTP has been resent to your email");
    } catch (error) {
      setError(error.response?.data?.message || "Error resending OTP");
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = useCallback((e) => {
    setOTP(e.target.value);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700/50">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50 space-y-4">
          <h1 className="text-2xl font-bold text-white text-center">
            Verify OTP
          </h1>
          <div className="flex items-center justify-center space-x-2 bg-slate-700/30 p-3 rounded-lg border border-slate-600/50">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="text-slate-200 font-medium">{email}</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="otp" 
              className="block text-sm font-medium text-slate-200"
            >
              Enter OTP Code
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg 
                          text-white placeholder:text-slate-400
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
              />
            </div>
            <p className="text-sm text-slate-400">
              Please enter the 6-digit code sent to your email
            </p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/50 text-red-300">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700/50 space-y-4">
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
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>

          <button
            onClick={handleResendOTP}
            disabled={isResending}
            className="w-full px-4 py-2 rounded-lg font-medium
                     border-2 border-blue-500 text-blue-400
                     hover:bg-blue-500/10 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <div className="flex items-center justify-center space-x-2">
              {isResending ? (
                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <RefreshCcw className="h-5 w-5" />
              )}
              <span>{isResending ? "Resending..." : "Resend OTP"}</span>
            </div>
          </button>

          <p className="text-center text-sm text-slate-400">
            Didn't receive the code? Check your spam folder
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAdminOTP;
