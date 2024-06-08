import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { BiLink, BiLogOut } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { server, useLogoutQuery } from "../redux/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import ContentDisplay from "../Components/ContentDisplay";
import { userNotExists } from "../redux/reducers/userReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [all, setAll] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState(false);
  const [reels, setReels] = useState(false);
  const [favourites, setFavourites] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // }, []);
  const logoutHandler = async () => {
    await axios
      .get(`${server}/api/v1/user/logout`, { withCredentials: true })
      .then(({ data }) => {
        navigate("/");
        toast.success(data?.message);
        dispatch(userNotExists());
      });
  };
  return (
    <Layout>
      <div className="w-full h-full bg-white">
        <dir className="w-full py-2 h-12 flex justify-center items-center absolute -top-4 z-[999]">
          <button onClick={logoutHandler} className="flex items-center gap-1">
            Logout <BiLogOut />
          </button>
        </dir>
        <h2 className="text-xl font-semibold text-center mt-5">
          {user?.username}
        </h2>
        <div className="w-full pt-4 px-6 lg:px-3 md:px-3 justify-between flex items-start">
          <div className="profile bg-zinc-500 w-24 h-24  lg:w-20 md:w-20 md:h-20 lg:h-20 rounded-full overflow-hidden">
            <img src={user?.profile} className="w-full h-full" alt="" />
          </div>
          <div className="pl-5">
            <div className="flex gap-2">
              <Link
                to={"/profile/edit"}
                className="px-3 font-semibold lg:text-xs md:text-xs tracking-tight py-1.5 rounded-md bg-zinc-200"
              >
                Edit profile
              </Link>
              <Link className="px-3 font-semibold lg:text-xs tracking-tight md:text-xs py-1.5 rounded-md bg-zinc-200">
                View archive
              </Link>
            </div>
            <button className="w-full mt-2 font-semibold py-1.5 lg:text-xs md:text-xs  rounded-md bg-zinc-200">
              Add tools
            </button>
          </div>
        </div>
        <div className="w-full px-6 py-6 mt-2 border-b border-black/20">
          <h2 className="font-semibold">{user?.fullName}</h2>
          <p className="w-1/2 text-sm">{user?.bio}</p>
          {user?.websiteLink && (
            <a
              href={user?.websiteLink}
              target="_blank"
              className="text-xs flex gap-0.5 items-center text-ellipsis font-semibold text-blue-900"
            >
              <BiLink className="text-sm" />
              {user?.websiteLink}
            </a>
          )}
        </div>
        <div className="w-full py-4 flex justify-between border-b px-16 border-black/20">
          <div className="flex flex-col gap-1 items-center">
            <span className="leading-none font-semibold">
              {user?.posts?.length + user?.reels?.length}
            </span>
            <h3 className="leading-none">posts</h3>
          </div>
          <Link
            to="/user/followers"
            className="flex flex-col gap-1 items-center"
          >
            <span className="leading-none font-semibold">
              {user?.followers?.length}
            </span>
            <h3 className="leading-none">followers</h3>
          </Link>
          <Link
            to="/user/following"
            className="flex flex-col gap-1 items-center"
          >
            <span className="leading-none font-semibold">
              {user?.following?.length}
            </span>
            <h3 className="leading-none">following</h3>
          </Link>
        </div>
        <div className="w-full px-12 flex items-center justify-between transition-all duration-300 py-4 border-b border-black/20">
          <button
            onClick={() => {
              setAll(true);
              setPosts(false);
              setReels(false);
              setFavourites(false);
            }}
          >
            <div
              className={`w-5 h-5 border transition-all duration-300 ${
                all ? "border-sky-500" : "border-black/40"
              } grid grid-cols-3 grid-rows-3`}
            >
              {[...Array(9)].map((_, index) => {
                return (
                  <div
                    className={`w-full h-full border transition-all duration-300 ${
                      all ? "border-sky-500" : "border-black/40"
                    }`}
                  ></div>
                );
              })}
            </div>
          </button>
          <button
            onClick={() => {
              setAll(false);
              setPosts(true);
              setReels(false);
              setFavourites(false);
            }}
            className="flex w-3 h-5 flex-col gap-0.5"
          >
            <div
              className={`w-full h-0.5 ${
                posts ? "bg-sky-500" : "bg-black/40"
              } transition-all duration-300`}
            ></div>
            <div
              className={`w-full h-2.5 border-2 ${
                posts ? "border-sky-500" : "border-black/40"
              } transition-all duration-300`}
            ></div>
            <div
              className={`w-full h-0.5 ${
                posts ? "bg-sky-500" : "bg-black/40"
              } transition-all duration-300`}
            ></div>
          </button>
          <button
            onClick={() => {
              setAll(false);
              setPosts(false);
              setReels(true);
              setFavourites(false);
            }}
            className={`border-[1px] h-5 rounded-md w-5 flex items-center justify-center transition-all duration-300 ${
              reels ? "border-sky-500" : "border-black/40"
            }`}
          >
            <FaPlay
              className={`text-[10px] transition-all duration-300 ${
                reels ? "text-sky-600" : "text-black/40"
              }`}
            />
          </button>
          <button
            onClick={() => {
              setAll(false);
              setPosts(false);
              setReels(false);
              setFavourites(true);
            }}
          >
            <button
              className={`w-4 h-4 rounded-sm border-2 ${
                favourites ? "border-sky-500" : "border-black/40"
              } border-b-0 after:content-[''] after:absolute after:w-full after:h-3 after:border-2 transition-all duration-300 ${
                favourites ? "after:border-sky-500" : "after:border-black/40"
              } after:-bottom-1.5 overflow-hidden after:left-1/2 after:-translate-x-1/2 relative after:rotate-45 after:border-b-0 after:border-r-0`}
            ></button>
          </button>
          <button>faks</button>
        </div>
        <div className="w-full grid grid-cols-3 gap-0.5 justify-between bg-white border-t-[1px] border-black/60 h-full">
          {all && (
            <>
              {user?.posts?.map((post, index) => (
                <div key={index} className="w-full h-40 bg-zinc-300">
                  <ContentDisplay src={post.attachMent} />
                </div>
              ))}
            </>
          )}
          {reels && (
            <>
              {user?.reels?.map((reel, index) => (
                <Link
                  to={`/reels`}
                  key={reel?._id}
                  className="w-full h-40 bg-zinc-300 relative"
                >
                  <video
                    src={reel?.attachMent}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full"
                    alt=""
                  />
                  <div className="bottom-2 left-2 items-center absolute text-white flex gap-1">
                    <FaPlay className="text-sm" />
                    <span>{reel.views}</span>
                  </div>
                </Link>
              ))}
            </>
          )}
          {favourites && (
            <>
              {user?.favorites?.map((favorite, index) => (
                <Link
                  to={`/reels`}
                  key={favorite?._id}
                  className="w-full h-40 bg-zinc-300 relative"
                >
                  <video
                    src={favorite?.attachMent}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full"
                    alt=""
                  />
                  <div className="bottom-2 left-2 items-center absolute text-white flex gap-1">
                    <FaPlay className="text-sm" />
                    <span>{favorite.views}</span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
