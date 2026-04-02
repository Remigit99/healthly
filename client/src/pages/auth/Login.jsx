import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../store/features/auth/authApiSlice";
import {
  setCredentials,
  selectCurrentUser,
} from "../../store/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  // RTK Query hook gives us the trigger function and the loading state
  const [login, { isLoading }] = useLoginMutation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === "parent" ? "/" : "/app/doctor");
    }
  }, [user, navigate]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // 1. Execute the mutation
      const userData = await login({ email, password }).unwrap();

      // 2. Save result to the "Wallet" (authSlice)
      dispatch(setCredentials({ ...userData }));

      // 3. Clear inputs and navigate
      setEmail("");
      setPassword("");
      navigate(userData.user.role === "parent" ? "/" : "/app/doctor");
    } catch (err) {
      // Handle the 401/403 errors we set up in the backend
      if (!err?.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 403) {
        setErrMsg("Account not verified. Please check your email.");
      } else {
        setErrMsg("Invalid Email or Password");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-max-[320px] md:w-auto mx-auto shadow-2xl border border-gray1 rounded-lg pt-4 px-6 py-8">
        <h2 className="text-h4 font-semibold text-center">Login</h2>
        <p className="text-accent text-gray1 text-p-small mt-2 mb-12 flex justify-center items-center">
          Welcome back!
        </p>

        <div>
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-6">
            <div>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className="px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-full outline-0 border border-gray1"
              />
              {errMsg && (
                <p className="text-red-500 text-p-small mt-1">{errMsg}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-full outline-0 border border-gray1"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="my-6  cursor-pointer w-48 font-bold bg-orange5 text-white rounded px-4 py-2 hover:bg-orange3"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div>
            <p className="text-p-small text-gray1">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green1 font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
