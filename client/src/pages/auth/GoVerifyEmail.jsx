import React from "react";

const GoVerifyEmail = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        Check your inbox!
      </h2>
      <p className="text-slate-600 mb-8 leading-relaxed">
        We've sent a secure verification link to your email. Please click the
        link to activate your Healthly account.
      </p>
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-700 mb-6">
        <strong>Tip:</strong> If you don't see it, check your{" "}
        <span className="font-bold">Spam</span> or{" "}
        <span className="font-bold">Promotions</span> folder.
      </div>
      <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
        Didn't receive anything? Resend email
      </button>
    </div>
  );
};

export default GoVerifyEmail;
