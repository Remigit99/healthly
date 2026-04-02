import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
// Import the whole slice to see what's inside
import * as authApi from "../../store/features/auth/authApiSlice";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("Token from URL:", token)
  const navigate = useNavigate();

  // DEBUG: This will now run because we aren't destructuring yet
  console.log("What is in authApiSlice?", authApi);

  // Check if the hook exists before trying to use it
  if (!authApi.useVerifyEmailMutation) {
    return <div className="p-20 text-red-500 font-bold">Error: useVerifyEmailMutation is UNDEFINED. Check authApiSlice.js exports!</div>;
  }

  // If it exists, we can safely use it
  const [verifyEmail, { isLoading, isSuccess, isError }] = authApi.useVerifyEmailMutation();

const hasCalled = useRef(false);

useEffect(() => {
  if (token && !hasCalled.current) {
    hasCalled.current = true; // This "locks" the function
    verifyEmail(token);
  }
}, [token, verifyEmail]);

  return (
    <div className="p-20 text-center">
      {isLoading && <p>Verifying...</p>}
      {isSuccess && 
      <div>
      <p className="text-emerald-500">Verified Successfully!</p>
      <button
        onClick={() => navigate("/login")}
        className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"     
      >
        Go to Login
      </button>
      </div>}
      
      {isError && <p className="text-red-500">Verification Failed.</p>}
    </div>
  );
};

export default VerifyEmail;









// import { useEffect} from "react";
// import { useSearchParams, useNavigate, Link } from "react-router";
// import { useVerifyEmailMutation } from "../../store/features/auth/authApiSlice";

// const VerifyEmail = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");
//   const navigate = useNavigate();
  
//   // RTK Query Hook
//   const [verifyEmail, { isLoading, isSuccess, isError }] = useVerifyEmailMutation();

//   useEffect(() => {
//     if (token) {
//       verifyEmail(token);
//     }
//   }, [token, verifyEmail]);

// console.log("Hook Check:", useVerifyEmailMutation);

//   return (
//     <div className="flex items-center justify-center min-h-[60vh]">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
        
//         {/* STATE 1: LOADING */}
//         {isLoading && (
//           <div className="space-y-4">
//             <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//             <h2 className="text-xl font-semibold text-slate-800">Verifying your account...</h2>
//             <p className="text-slate-500 text-sm">Please wait while we secure your access.</p>
//           </div>
//         )}

//         {/* STATE 2: SUCCESS */}
//         {isSuccess && (
//           <div className="space-y-6">
//             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">Email Verified!</h2>
//               <p className="text-slate-500 mt-2">Your Healthly account is now fully active.</p>
//             </div>
//             <button 
//               onClick={() => navigate("/login")}
//               className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md"
//             >
//               Sign In to Your Dashboard
//             </button>
//           </div>
//         )}

//         {/* STATE 3: ERROR */}
//         {isError && (
//           <div className="space-y-6">
//             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">Verification Failed</h2>
//               <p className="text-slate-500 mt-2">The link is invalid or has already expired.</p>
//             </div>
//             <div className="flex flex-col gap-3">
//               <Link to="/register" className="text-indigo-600 font-semibold hover:underline text-sm">
//                 Try registering again
//               </Link>
//               <Link to="/login" className="text-slate-400 text-sm hover:text-slate-600">
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;