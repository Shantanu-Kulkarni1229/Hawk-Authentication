import React, { useState, useCallback } from "react";
import { verifyOTP } from "../api";
import { Mail, KeyRound, Loader2 } from 'lucide-react';

const VerifyOTP = ({ email, onNext }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyOTP({ email, otp });
      onNext();
    } catch (error) {
      setError(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = useCallback((e) => {
    setOtp(e.target.value);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <KeyRound className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Verify Your Email
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>
            <p className="text-sm text-gray-500">
              Please enter the verification code sent to your email
            </p>
          </div>
        </div>

        {/* OTP Input */}
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              type="text"
              placeholder="Enter code"
              value={otp}
              onChange={handleChange}
              maxLength={6}
              className="w-full px-4 py-3 text-gray-900 placeholder:text-gray-400 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>

          {/* Resend Option */}
          <div className="text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Didn't receive the code? Resend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
