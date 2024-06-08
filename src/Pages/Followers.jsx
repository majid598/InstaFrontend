import { useSelector } from "react-redux";
import { useRemoveAFollowerMutation } from "../redux/api/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Followers = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [removeFollower] = useRemoveAFollowerMutation();
  const deleteHandler = (followerId) => {
    const data = { userId: user._id, followerId };
    removeFollower(data)
      .unwrap()
      .then((data) => {
        navigate("/user/followers");
        toast.success(data.message);
      })
      .catch((err) => toast.error(err.data.message));
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
              to={`/user/${follower._id}`}
              className="w-12 h-full rounded-full bg-zinc-300 overflow-hidden"
            >
              <img src={follower?.profile} alt="" className="w-full h-full" />
            </Link>
            <div>
              <Link to={`/user/${follower._id}`}>{follower.username}</Link>
              <h2>{follower.fullName}</h2>
            </div>
          </div>
          <button
            onClick={() => deleteHandler(follower._id)}
            className="bg-zinc-200 rounded-lg font-semibold p-1.5 px-4"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Followers;
