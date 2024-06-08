import { IoHeartOutline } from "react-icons/io5";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useFollowToaUserMutation,
  useMyNotificationsQuery,
} from "../redux/api/api";

const Notifications = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useMyNotificationsQuery(user._id);

  const [followUser] = useFollowToaUserMutation();
  const follow = (userId) => {
    const data = { userId, followerId: user._id };
    followUser(data)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="w-full py-10 flex flex-col items-center">
          <div className="rounded-full p-3 border border-black/50">
            <IoHeartOutline className="text-5xl text-black/50" />
          </div>
          <h2 className="text-sm">Activity on your posts</h2>
          <h3 className="text-xs mx-auto text-center w-4/5">
            When someone likes or comments on one of your posts. you,ll see it
            here.
          </h3>
          <Link
            to="/post/new"
            className="mt-4 inline-block text-sky-500 font-semibold text-xs"
          >
            Share your first photo
          </Link>
        </div>
        <h1 className="text-sm font-semibold p-2">Suggested for you</h1>
        <div className="w-full p-2 flex flex-col-reverse">
          {data?.notifications?.map((notification, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center py-1 mt-4"
            >
              <div className="w-full flex items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-zinc-300 overflow-hidden">
                  <img
                    src={notification?.sender?.profile}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
                <div className="w-2/5">
                  <h2 className="text-xs font-semibold">
                    {notification?.sender?.username}
                  </h2>
                  <p className="w-full text-xs font-semibold text-zinc-500">
                    {notification?.message}
                  </p>
                </div>
              </div>
              <button
                onClick={() => follow(notification?.sender?._id)}
                className="py-1.5 px-4 bg-sky-500 rounded-md text-white font-bold text-sm"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
