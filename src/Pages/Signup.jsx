import { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/userReducer";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "",
    username: "",
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
        `${server}/api/v1/user/new`,
        userDetails,
        {
          withCredentials: true,
        }
      );
      dispatch(userExists(data?.user));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full min-h-screen lg:h-[82vh] lg:overflow-y-scroll lg:w-[20rem] lg:px-0 md:w-[20rem] md:px-0 sm:w-[20rem] sm:px-0 mx-auto py-4 px-20">
      <div className="w-full h-full flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center border border-black/20 py-8"
        >
          <div className="w-3/5">
            <img src="/assets/Instagram_logo.svg" alt="" />
          </div>
          <div className="w-full px-12">
            <p className="text-center font-semibold text-zinc-500">
              Sign up to see photos and videos from your friends.
            </p>
            <button className="flex mt-4 items-center rounded-md py-2 w-full bg-sky-500 text-white font-bold text-sm gap-2 justify-center">
              <FaFacebookSquare className="text-xl text-white" /> Log in with
              Facebook
            </button>
          </div>
          <div className="w-full px-12 mt-4 flex gap-3 justify-center items-center">
            <div className="w-[40%] h-[1px] bg-black/30 rounded-xl"></div>
            <span className="text-sm text-zinc-600">OR</span>
            <div className="w-[40%] h-[1px] bg-black/30 rounded-xl"></div>
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
              type="text"
              className="w-full p-2 border mt-2 border-black/30 focus:border-black/50 rounded-sm bg-zinc-50 text-sm outline-none"
              placeholder="Full Name"
              value={userDetails.fullName}
              name="fullName"
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-full p-2 border mt-2 border-black/30 focus:border-black/50 rounded-sm bg-zinc-50 text-sm outline-none"
              placeholder="Username"
              value={userDetails.username}
              name="username"
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
            <p className="text-xs text-center w-full tracking-tighter mt-4 text-zinc-500">
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <Link
                className="text-zinc-700"
                to="https://www.facebook.com/help/instagram/261704639352628"
              >
                Learn More
              </Link>
            </p>
            <p className="text-xs text-center w-full tracking-tighter mt-4 text-zinc-500">
              By signing up, you agree to our{" "}
              <Link
                className="text-zinc-700"
                to="https://help.instagram.com/581066165581870/?locale=en_US"
              >
                Terms
              </Link>{" "}
              ,{" "}
              <Link
                className="text-zinc-700"
                to="https://www.facebook.com/privacy/policy"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                className="text-zinc-700"
                to="https://www.instagram.com/legal/cookies/"
              >
                Cookies Policy .
              </Link>
            </p>
            <button className="w-full bg-sky-400 hover:bg-sky-500 transition-all duration-300 rounded-md p-1.5 mt-2 text-white font-bold">
              Sign up
            </button>
          </div>
        </form>
        <div className="w-full border border-black/20 flex justify-center py-5 mt-3 text-sm gap-1">
          <h2>Have an account?</h2>
          <Link to="/" className="text-sky-500 font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
