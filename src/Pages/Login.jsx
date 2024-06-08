import { useState } from "react";
import { FaFacebook, FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../redux/api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/userReducer";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        userDetails,
        {
          withCredentials: true,
        }
      );
      navigate("/profile")
      dispatch(userExists(true));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen py-10 px-20">
      <div className="w-full h-full flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center border border-black/20 py-8"
        >
          <div className="w-3/5">
            <img src="/assets/Instagram_logo.svg" alt="" />
          </div>
          <div className="w-4/5 mt-6 px-4">
            <input
              type="text"
              className="w-full p-2 border border-black/30 focus:border-black/50 rounded-sm bg-zinc-50 text-sm outline-none"
              placeholder="Phone number, user, or email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="w-full p-2 mt-2 border border-black/30 focus:border-black/50 rounded-sm bg-zinc-50 text-sm outline-none"
              placeholder="Password"
              value={userDetails.password}
              name="password"
              onChange={handleChange}
            />
            <button className="w-full bg-sky-400 hover:bg-sky-500 transition-all duration-300 rounded-md p-1.5 mt-2 text-white font-bold">
              Log in
            </button>
            <div className="w-full mt-4 flex gap-3 items-center">
              <div className="w-[40%] h-[1px] bg-black/30 rounded-xl"></div>
              <span className="text-sm text-zinc-600">OR</span>
              <div className="w-[40%] h-[1px] bg-black/30 rounded-xl"></div>
            </div>
            <div className="w-full mt-4 px-6 flex flex-col items-center">
              <button className="flex items-center gap-2 justify-center">
                <FaFacebookSquare className="text-xl text-blue-700" /> Log in
                with Facebook
              </button>
              <Link className="text-xs mt-4 inline-block">
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
        <div className="w-full border border-black/20 flex justify-center py-5 mt-3 text-sm gap-1">
          <h2>Don't have an account?</h2>
          <Link to="/signup" className="text-sky-500 font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
