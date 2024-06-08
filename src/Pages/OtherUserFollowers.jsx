import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useFollowToaUserMutation,
  useGetOtherUserQuery,
  useRemoveAFollowerMutation,
} from "../redux/api/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

const OtherUserFollowers = () => {
  const userId = useParams().id;
  const { user: me } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetOtherUserQuery(userId);
  const user = data?.user;
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(
    user?.followers?.includes(me._id)
  );
  const [followUser] = useFollowToaUserMutation();
  const follow = (userId) => {
    const data = { userId, followerId: me._id };
    followUser(data)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        isFollowed ? setIsFollowed(false) : setIsFollowed(true);
      })
      .catch((err) => toast.error(err?.data?.message));
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-2 py- px-6">
      <div className="w-full flex py-2">
        back{" "}
        <h2 className="text-center w-full font-semibold text-xl">Followers</h2>
      </div>
      <div className="w-full flex py-2">
        <input
          type="text"
          className="w-full p-2 bg-zinc-200 rounded-lg outline-none"
          placeholder="Search"
        />
      </div>
      {user?.followers?.map((follower, index) => (
        <div
          key={index}
          className="w-full justify-between h-12 flex items-center"
        >
          <div className="flex gap-3 h-full">
            <Link
              to={
                follower._id === me._id ? "/profile" : `/user/${follower._id}`
              }
              className="w-12 h-full rounded-full bg-zinc-300 overflow-hidden"
            >
              <img src={follower?.profile} alt="" className="w-full h-full" />
            </Link>
            <div>
              <Link
                to={
                  follower._id === me._id ? "/profile" : `/user/${follower._id}`
                }
              >
                {follower.username}
              </Link>
              <h2>{follower.fullName}</h2>
            </div>
          </div>

          <button
            onClick={() => follow(follower._id)}
            hidden={follower._id === me._id}
            className={`${
              isFollowed ? "bg-zinc-200 text-black" : "bg-sky-500 text-white"
            } font-bold rounded-lg p-1.5 px-4`}
          >
            {isFollowed ? "following" : "follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default OtherUserFollowers;
