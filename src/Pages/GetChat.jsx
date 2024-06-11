import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAllMessagesQuery,
  useGetChatQuery,
  useSendMessageMutation,
} from "../redux/api/api";

const GetChat = () => {
  const chatContainerRef = useRef(null);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const chatId = useParams().id;
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetChatQuery(chatId);
  const {
    data: messagesData,
    isError,
    isLoading: messageLoading,
  } = useAllMessagesQuery(chatId);

  const getMessageDateTime = (createdAt) => {
    const messageDate = moment(createdAt);
    const currentDate = moment();

    // Check if the message was created today
    if (messageDate.isSame(currentDate, "day")) {
      // Format as 24-hour time if created today
      return messageDate.format("HH:mm");
    } else if (messageDate.isSame(currentDate, "week")) {
      // Format as date and time if created within the same week
      return messageDate.format("dddd, HH:mm");
    } else {
      // Format as date and time if created on a different day within the same week
      return messageDate.format("MMM D, HH:mm");
    }
  };

  const [messageSend] = useSendMessageMutation();

  const sendMessage = () => {
    const message = {
      otherUserId:
        data?.chat?.user2?._id === user._id
          ? data?.chat?.user1?._id
          : data?.chat?.user2?._id,
      content,
      chatId: data?.chat?._id,
    };
    messageSend(message)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        setContent("");
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  const renderMessageContent = (content) => {
    // Regular expression to detect URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Check if content is a link
    if (urlRegex.test(content)) {
      return (
        <a href={content} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    } else {
      return content;
    }
  };

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: "start",
      });
    }
  };

  useEffect(() => {
    smoothScrollTo("bottom")
  }, [messagesData?.messages]);

  if (isError) return toast.error("Chat Id Expired");

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full h-screen relative bg-white">
      <div
        className="w-full max-h-screen overflow-y-scroll pb-20"
      >
        <div className="w-full flex px-4 py-2 justify-between">
          <Link to="/">Back</Link>
          <h2>{user?.username}</h2>
          <div></div>
        </div>
        <div className="w-full p-5">
          <div className="h-52">
            <div className="w-20 h-20 rounded-full bg-zinc-300 overflow-hidden mx-auto">
              <img
                src={
                  data?.chat?.user2?._id === user._id
                    ? data?.chat?.user1?.profile
                    : data?.chat?.user2?.profile
                }
                className="w-full h-full"
                alt=""
              />
            </div>
            <h2 className="w-full text-center mt-2 font-bold text-xl">
              {data?.chat?.user2?._id === user._id
                ? data?.chat?.user1?.fullName
                : data?.chat?.user2?.fullName}
            </h2>
            <h2 className="w-full text-center font-semibold">
              {data?.chat?.user2?._id === user._id
                ? data?.chat?.user1?.username
                : data?.chat?.user2?.username}{" "}
              - Instagram
            </h2>
          </div>
          {messageLoading ? (
            <div>loading...</div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              {messagesData?.messages?.map((message, index) => (
                <div key={message?._id} className="w-full">
                  <div
                    className={`w-full flex items-end gap-3 ${message?.sender?._id === user._id
                      ? "justify-end"
                      : "justify-start"
                      }`}
                  >
                    {message?.sender?._id === user._id ? (
                      ""
                    ) : (
                      <div className="w-6 h-6 overflow-hidden rounded-full bg-zinc-300">
                        <img src={message?.sender?.profile} alt="" />
                      </div>
                    )}
                    <div
                      className={`w-1/2 h-full px-3 py-2 ${message?.sender?._id === user._id
                        ? "bg-[#3797F0] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm "
                        : "bg-black/10 text-zinc-800 rounded-xl"
                        }`}
                    >
                      <p className="text-sm">
                        {renderMessageContent(message?.content)}
                      </p>
                    </div>
                    {/* <h4 className="text-xs text-zinc-500">
          {timeAgo(message?.createdAt)}
        </h4> */}
                  </div>
                  <div className="w-full py-5 text-center justify-center">
                    <h5 className="text-xs text-zinc-500">
                      {getMessageDateTime(message?.createdAt)}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div id="bottom" className="w-full"></div>
        </div>
      </div>
      <div className="w-full h-20 absolute bottom-0 left-0 bg-white flex items-center justify-between px-4">
        <input
          type="text"
          className="outline-none border-2 rounded-full px-4 py-2 w-full pr-24
        "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="message..."
        />
        {content.length > 0 && (
          <button
            onClick={sendMessage}
            className="absolute right-8 text-sm font-semibold text-sky-500 p-1.5 px-4 hover:bg-black/10 rounded-full"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default GetChat;
