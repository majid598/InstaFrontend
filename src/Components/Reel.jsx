import ReactPlayer from "react-player";
import { SwiperSlide } from "swiper/react";
import { IoHeartOutline } from "react-icons/io5";
import { FaComments } from "react-icons/fa6";
import { BiMessageRounded, BiSend } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  server,
  useAddCommentToReelMutation,
  useAddToFavofitesMutation,
  useLikeReelMutation,
  useMyChatsQuery,
  useSendMessageMutation,
} from "../redux/api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "emoji-mart/package.json";
import { Picker } from "emoji-mart";
const Reel = ({ index, reel, playerRefs, currentIndex }) => {
  const { user } = useSelector((state) => state.auth);
  const [isComment, setIsComment] = useState(false);
  const [isFavorited, setIsFavorited] = useState(
    reel.favorites.includes(user._id)
  );
  const [isLike, setIsLike] = useState(false);
  const [isShareMenu, setIsShareMenu] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLiked, setIsLiked] = useState(reel.likes.includes(user._id));
  const handleVideoClick = (index) => {
    const player = playerRefs.current[index].getInternalPlayer();
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  const [likeReel] = useLikeReelMutation();
  const [addTo] = useAddToFavofitesMutation();

  const likeToReel = (reelId) => {
    const data = {
      reelId,
      userId: user._id,
    };
    likeReel(data)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        isLiked ? setIsLiked(false) : setIsLiked(true);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  const addToFavorites = () => {
    const data = {
      reelId: reel._id,
    };
    addTo(data)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        isFavorited ? setIsFavorited(false) : setIsFavorited(true);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  const { data } = useMyChatsQuery(user._id);
  const [addComment] = useAddCommentToReelMutation();
  const handleSubmit = () => {
    const data = {
      comment,
      reelId: reel._id,
      userId: user._id,
    };
    console.log(data);
    addComment(data)
      .unwrap()
      .then((data) => {
        setComment("");
        toast.success(data?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  const [messageSend] = useSendMessageMutation();

  const sendMessage = () => {
    const chat = selectedChat;
    const message = {
      otherUserId:
        selectedChat?.user2?._id === user._id
          ? selectedChat?.user1?._id
          : selectedChat?.user2?._id,
      content: shareableLink,
      chatId: selectedChat._id,
    };
    console.log(message);
    messageSend(message)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        setIsShareMenu(false);
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  const shareableLink = `http://localhost:5173/reel/${reel._id}`;

  const shareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareableLink
    )}`;
    window.open(shareUrl, "_blank");
  };

  const shareWhatsapp = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareableLink
    )}`;
    window.open(shareUrl, "_blank");
  };

  // Function to share the reel on Twitter
  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareableLink
    )}`;
    window.open(shareUrl, "_blank");
  };

  // Function to share the reel via email
  const shareViaEmail = () => {
    const subject = encodeURIComponent("Check out this amazing reel!");
    const body = encodeURIComponent(
      `Check out this amazing reel: ${shareableLink}`
    );
    const shareUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(shareUrl);
  };

  const share = () => {
    setIsShareMenu(true);
  };

  console.log(selectedChat);

  const selectChatForShare = (chatId) => {
    if (selectedChat.indexOf(chatId) === -1) {
      setSelectedChat([...selectedChat, chatId]);
    } else {
      selectedChat.splice(selectedChat.indexOf(chatId), 1);
    }
  };
  const handleEmojiSelect = (emoji) => {
    setComment(comment + emoji.native);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLike(false);
    }, 2000);
  }, []);

  return (
    <div
      onDoubleClick={() => {
        likeToReel(reel._id);
        setIsLike(true);
      }}
      className="w-full h-full relative"
      id={reel?._id}
    >
      {isLike && (
        <div className="absolute z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <GoHeartFill className="text-7xl text-red-500" />
        </div>
      )}
      <ReactPlayer
        ref={(player) => (playerRefs.current[index] = player)}
        url={reel.attachMent}
        playing={index === currentIndex}
        style={{ position: "absolute" }}
        width="100%"
        height="100%"
        loop={true}
        onClick={() => {
          handleVideoClick(index);
          setIsComment(false);
        }} // Prevent slider from changing when clicking on video controls
      />
      <div className="w-12 h-12 rounded-full overflow-hidden right-5 bg-zinc-500 to-1/3">
        <img src={reel?.user?.profile} alt="" />
      </div>
      <div className="w-full z-50 absolute bottom-0 gap-2 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-white border bg-zinc-500 relative z-50">
            <img src={reel?.user?.profile} alt="" />
          </div>
          <h2 className="text-white text-sm">{reel?.user?.username}</h2>
        </div>
        <div className="w-full">
          <p className="text-white text-xs mt-2 text-start">{reel?.title}</p>
          <p className="text-white text-xs mt-2 text-start">{reel?.caption}</p>
          <p className="w-1/2 overflow-hidden text-white text-xs text-ellipsis whitespace-nowrap">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum,
            eveniet!
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 w-12 h-2/5 right-0 flex flex-col gap-2 items-center">
        <button
          onClick={() => likeToReel(reel._id)}
          className="flex flex-col text-white items-center"
        >
          {isLiked ? (
            <GoHeartFill className="text-xl text-red-500" />
          ) : (
            <GoHeart className="text-xl" />
          )}
          <span className="text-sm text-center">{reel?.likes?.length}</span>
        </button>
        <button
          onClick={() => setIsComment(true)}
          className="flex flex-col text-white items-center"
        >
          <BiMessageRounded className="text-xl" />
          <span className="text-sm text-center">{reel?.comments?.length}</span>
        </button>
        <button
          onClick={share}
          className="flex relative z-[999] flex-col text-white items-center"
        >
          <BiSend className="text-xl -rotate-45" />
          <span className="text-sm text-center">{reel?.share?.length}</span>
        </button>
        {isShareMenu && (
          <div className="w-[20rem] absolute h-[20rem] right-0 bottom-2/3 bg-black/70">
            <div className="w-full h-1/5 border-b border-white/30 relative">
              <span className="absolute left-2 top-1/2 text-sm text-white -translate-y-1/2">
                To:
              </span>
              <input
                type="search"
                className="w-full h-full outline-none pl-8 text-sm bg-transparent p-2 text-white/80"
                placeholder="Search a freind to share..."
              />
            </div>
            <div className="w-full h-4/5 overflow-y-scroll py-4 px-2">
              {data?.chats?.map((chat) => (
                <div
                  key={chat._id}
                  className="py-2 flex items-center justify-between border-b border-white/30 w-full"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={
                          chat?.user2?._id === user?._id
                            ? chat?.user1?.profile
                            : chat?.user2?.profile
                        }
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <div className="text-sm text-white text-start">
                      <h3>
                        {chat?.user2?._id === user._id
                          ? chat?.user1?.fullName
                          : chat?.user2?.fullName}
                      </h3>
                      <h4 className="text-xs">
                        {chat?.user2?._id === user._id
                          ? chat?.user1?.username
                          : chat?.user2?.username}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChat(chat)}
                    className={`w-5 h-5 ${
                      selectedChat?._id === chat._id ? "bg-sky-500" : "bg-white"
                    } border border-white rounded-full`}
                  ></button>
                  <div className="absolute px-4 bottom-0 left-0 w-full">
                    <button
                      disable={selectedChat === null}
                      onClick={sendMessage}
                      className="w-full disabled:opacity-70 p-2 rounded-lg bg-sky-500 text-white font-semibold"
                    >
                      send
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button onClick={addToFavorites}>
          <div
            className={`w-4 h-4 rounded-sm ${
              isFavorited ? "bg-white" : ""
            } after:bg-black z-[999] border-2 border-white border-b-0 after:content-[''] after:absolute after:w-full after:h-3 after:border-2 transition-all duration-300 after:border-white
                   after:-bottom-1.5 overflow-hidden after:left-1/2 after:-translate-x-1/2 relative after:rotate-45 after:border-b-0 after:border-r-0`}
          ></div>
          <span className="text-sm text-center text-white">{reel?.favorites?.length}</span>
        </button>
      </div>
      <div
        className={`${
          isComment ? "bottom-0" : "-bottom-full"
        } absolute transition-all duration-300 left-0 w-full h-1/2 bg-black/70 z-[999]`}
      >
        <div className="w-full h-1/5 border-b border-white/30">
          <input
            type="text"
            className="w-full h-full p-2 text-sm bg-transparent text-white outline-none"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="text-xs absolute top-8 right-2 text-white">
            😀
          </button>
          {comment.length > 0 && (
            <button
              onClick={handleSubmit}
              className="text-white absolute top-2 right-2 text-sm"
            >
              Submit
            </button>
          )}
        </div>
        <div className="w-full h-4/5 flex flex-col gap-1 overflow-y-scroll px-2">
          {reel?.comments?.map((comment) => (
            <div
              key={comment?.comment}
              className="w-full flex gap-2 text-white items-start text-start text-sm min-h-12 py-2"
            >
              <Link
                to={
                  comment?.user?._id === user._id
                    ? "/profile"
                    : `/user/${comment?.user?._id}`
                }
                className="w-8 h-8 rounded-full overflow-hidden"
              >
                <img
                  src={comment?.user?.profile}
                  className="w-full h-full"
                  alt=""
                />
              </Link>
              <div className="">
                <Link
                  to={
                    comment?.user?._id === user._id
                      ? "/profile"
                      : `/user/${comment?.user?._id}`
                  }
                >
                  {comment?.user?.username}
                </Link>
                <p className="text-xs">{comment?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reel;
