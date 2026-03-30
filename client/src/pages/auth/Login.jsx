import { Link } from "react-router";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-max-[320px] md:w-auto mx-auto shadow-2xl border border-gray1 rounded-lg pt-4 px-6 py-8">
        <h2 className="text-h4 font-semibold text-center">Login</h2>
        <p className="text-accent text-gray1 text-p-small mt-2 mb-12 flex justify-center items-center">
          Welcome back!
        </p>
        
        <div>
          <form className="flex flex-col gap-6">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              autoFocus
              className="px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-full outline-0 border border-gray1"
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              className="px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-full outline-0 border border-gray1"
            />

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="my-6  cursor-pointer w-48 font-bold bg-orange5 text-white rounded px-4 py-2 hover:bg-orange3"
              >
                Login
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
