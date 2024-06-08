import { BiMessageRounded, BiSend } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLikePostMutation } from "../redux/api/api";
import { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likePost] = useLikePostMutation();

  const likeToPost = (postId) => {
    const data = {
      postId,
      userId: user._id,
    };
    likePost(data)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        isLiked ? setIsLiked(false) : setIsLiked(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message);
      });
  };

  return (
    <div className="w-full min-h-72 bg-white">
      <div className="header w-full p-3 flex justify-between">
        <div className="flex gap-4">
          <Link
            to={
              post?.user?._id === user?._id
                ? "/profile"
                : `/user/${post?.user?._id}`
            }
            className="w-8 h-8 inline-block rounded-full overflow-hidden"
          >
            <img src={post?.user?.profile} className="w-full h-full" alt="" />
          </Link>
          <div>
            <Link className="text-sm font-semibold">
              {post?.user?.fullName}
            </Link>
            <h2 className="text-sm font-semibold text-zinc-500">
              Original audio
            </h2>
          </div>
        </div>
        <div>
          <button>
            <BsThreeDots />
          </button>
        </div>
      </div>
      <div className="w-full h-auto bg-red-500">
        <img src={post?.attachMent} className="w-full h-auto" alt="" />
      </div>
      <div className="w-full justify-between flex items-center py-3 px-2 pr-5">
        <div className="flex gap-4">
          <button
            onClick={() => likeToPost(post._id)}
            className="flex flex-col"
          >
            {isLiked ? (
              <TiHeartFullOutline className="text-3xl text-red-500" />
            ) : (
              <TiHeartOutline className="text-3xl" />
            )}
          </button>
          <button>
            <BiMessageRounded className="text-3xl" />
          </button>
          <button>
            <BiSend className="text-2xl -rotate-[30deg] -mt-3" />
          </button>
        </div>
        <button className="w-5 h-6 rounded-sm border-2 border-black border-b-0 after:content-[''] after:absolute after:w-full after:h-4 after:border-2 after:border-black after:-bottom-2 overflow-hidden after:left-1/2 after:-translate-x-1/2 relative after:rotate-45 after:border-b-0 after:border-r-0"></button>
      </div>
      <div className="px-2">
        <h2>Liked by ihsscrims and others</h2>
        <div className="mt-2">
          <div className="flex gap-2 items-center mb-2">
            <h2 className="font-semibold">{post?.user?.name}</h2>{" "}
            <p className="text-zinc-600">{post?.description}</p>
          </div>
          <div className="w-full border-b border-black/20">
            <input
              type="text"
              className="w-full p-2 outline-none border-none"
              placeholder="Add"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
