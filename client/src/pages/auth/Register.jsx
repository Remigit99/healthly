import RegisterBackground from "/signup_img.png";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useRegisterMutation } from "../../store/features/auth/authApiSlice";
import Spinner from "../../components/Spinner";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "parent", // Default role is "parent"
  });

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  // RTK Query hook gives us the trigger function and the loading state
  const [register, { isLoading }] = useRegisterMutation();

  // 2. Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    if (errMsg) setErrMsg(""); // Clear errors when user types
  };

  // 3. Submission Logic
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // The "Handshake" with the backend
      await register({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        role: userInfo.role,
      }).unwrap();

      // Redirect to the "Check Your Email" instruction page
      navigate("/go-verify-email");
    } catch (err) {
      setErrMsg(err.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 md:gap-8 w-full">
      <div className="hidden md:block">
        <img
          src={RegisterBackground}
          alt="Register Background"
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center pt-12">
        <h2 className="text-h4 font-semibold text-center">Register</h2>
        <p className="text-accent text-gray1 text-p-small mt-6 mb-12 text-center">
          Join EchoMed and Experience Pediatric Care like never before.
        </p>

        <div>
          <form
            onSubmit={handleSubmitForm}
            className="flex flex-col gap-6 w-full  mx-auto"
          >
            <div>
              <input
                value={userInfo.firstName}
                onChange={handleChange}
                type="text"
                name="firstName"
                id=""
                placeholder="First Name"
                autoFocus
                className="px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-full outline-0 border border-gray1"
              />
              {errMsg && (
                <p className="text-red-600 text-p-small mb-4">{errMsg}</p>
              )}
            </div>

            <div>
              <input
                value={userInfo.lastName}
                onChange={handleChange}
                type="text"
                name="lastName"
                id=""
                placeholder="Last Name"
                className="px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 
              rounded  py-2 w-full outline-0 border border-gray1"
              />
              {errMsg && (
                <p className="text-red-600 text-p-small mb-4">{errMsg}</p>
              )}
            </div>

            <div>
              <input
                value={userInfo.email}
                onChange={handleChange}
                type="email"
                name="email"
                id=""
                placeholder="Email"
                className="px-1 focus:border-green1 placeholder:text-accent
               placeholder:text-gray1 rounded  py-2 w-full outline-0 border border-gray1"
              />
              {errMsg && (
                <p className="text-red-600 text-p-small mb-4">{errMsg}</p>
              )}
            </div>

            <div>
              <input
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                type="password"
                name="password"
                id=""
                placeholder="Password"
                className="px-1 focus:border-green1 placeholder:text-accent
               placeholder:text-gray1 rounded  py-2 w-full outline-0 border border-gray1"
              />
              {errMsg && (
                <p className="text-red-600 text-p-small mb-4">{errMsg}</p>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="my-6 cursor-pointer w-48 font-bold bg-orange5 text-white rounded px-4 py-2 hover:bg-orange3"
            >
              {isLoading ? <Spinner /> : "Register"}
            </button>
          </form>

          <div>
            <p className="text-p-small text-gray1">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green1 font-semibold cursor-pointer hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
