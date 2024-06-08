import { Link, useParams } from "react-router-dom";
import {
  useFollowToaUserMutation,
  useGetOtherUserQuery,
  useRemoveAFollowerMutation,
} from "../redux/api/api";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ContentDisplay from "../Components/ContentDisplay";
import { FaPlay } from "react-icons/fa";
import { BiLink } from "react-icons/bi";

const OtherUser = () => {
  const [all, setAll] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState(false);
  const [reels, setReels] = useState(false);
  const { user: userMe } = useSelector((state) => state.auth);
  const [removeFollower] = useRemoveAFollowerMutation();
  const userId = useParams().id;
  const { data, isLoading, isError } = useGetOtherUserQuery(userId);
  const user = data?.user;
  const [isFollowed, setIsFollowed] = useState(
    user?.followers?.includes(userMe._id)
  );
  const [followUser] = useFollowToaUserMutation();
  const follow = () => {
    const data = { userId: user._id, followerId: userMe._id };
    followUser(data)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        isFollowed ? setIsFollowed(false) : setIsFollowed(true);
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  return (
    <Layout>
      <div className="w-full h-full bg-white">
        <div className="w-full pt-4 px-6 lg:px-3 mt-6 md:px-3 justify-between flex items-start">
          <div className="profile bg-zinc-500 w-24 h-24  lg:w-20 md:w-20 md:h-20 lg:h-20 rounded-full overflow-hidden">
            <img src={user?.profile} className="w-full h-full" alt="" />
          </div>
          <div className="w-3/5">
            <div className="w-full">
              <h2 className="w-full font-semibold">{user?.fullName}</h2>
            </div>
            <div className="flex w-full gap-2">
              <button
                onClick={follow}
                className={`w-1/2 mt-2 py-1.5 lg:text-xs md:text-xs lg:rounded-md md:rounded-md  rounded-xl ${
                  isFollowed ? "bg-zinc-200 text-black" : "bg-sky-500 text-white"
                } font-bold`}
              >
                {isFollowed ? "following" : "follow"}
              </button>
              <Link
                to={`/user/${user?._id}/chat/create`}
                className="w-1/2 text-center mt-2 font-semibold py-1.5 lg:text-xs md:text-xs lg:rounded-md md:rounded-md rounded-xl bg-zinc-200"
              >
                Message
              </Link>
            </div>
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
            to={`/other/user/${user?._id}/followers`}
            className="flex flex-col gap-1 items-center"
          >
            <span className="leading-none font-semibold">
              {user?.followers?.length}
            </span>
            <h3 className="leading-none">followers</h3>
          </Link>
          <Link
            to={`/other/user/${user?._id}/following`}
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
          <button>faks</button>
        </div>
        <div className="w-full grid grid-cols-3 gap-0.5 justify-between bg-white border-t-[1px] border-black/60 h-full">
          {all && (
            <>
              {user?.posts?.map((post, index) => (
                <div key={index} className="w-full h-40 bg-zinc-300">
                  <ContentDisplay src={post?.attachMent} />
                </div>
              ))}
            </>
          )}
          {reels && (
            <>
              {user?.reels?.map((reel, index) => (
                <div key={index} className="w-full h-40 bg-zinc-300">
                  <video
                    src={reel?.attachMent}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full"
                    alt=""
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OtherUser;
