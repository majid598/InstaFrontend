import { useNavigate, useParams } from "react-router-dom";
import {
  useAllMessagesQuery,
  useGetOtherUserQuery,
  useNewChatMutation,
  useSendMessageMutation,
} from "../redux/api/api";
import Layout from "../Layout/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NewChat = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [newChatId, setNewChatId] = useState("");
  const userId = useParams().id;
  const { user: me } = useSelector((state) => state.auth);
  //   const { data: messagesData } = useAllMessagesQuery(newChatId);
  const { data, isLoading, isError } = useGetOtherUserQuery(userId);
  const user = data?.user;

  const [newChat] = useNewChatMutation();
  const [messageSend] = useSendMessageMutation();
  const createNewChat = () => {
    const chatData = { otherUserId: userId };
    newChat(chatData)
      .unwrap()
      .then((res) => {
        const message = {
          otherUserId: user._id,
          chatId: res?.chat[0]?._id,
          content,
        };
        messageSend(message);
        toast.success(res?.message);
        setContent("");
      })
      .catch((err) => {
        navigate("/chats");
        toast.error(err?.data?.message);
      });
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="h-52 py-10">
          <div className="w-20 h-20 rounded-full bg-zinc-300 overflow-hidden mx-auto">
            <img src={user?.profile} className="w-full h-full" alt="" />
          </div>
          <h2 className="w-full text-center mt-2 font-bold text-xl">
            {user?.fullName}
          </h2>
          <h2 className="w-full text-center font-semibold">
            {user?.username} - Instagram
          </h2>
        </div>
        <div className="w-full flex flex-col gap-4">
          {/* {messagesData?.messages?.map((message, index) => (
            <div key={index} className="w-full">
              <div className={`w-full flex items-end gap-3 justify-end`}>
                <div
                  className={`w-1/2 h-full px-3 py-2 rounded-xl bg-[#3797F0] text-white"

                  `}
                >
                  <p className="text-sm">{message?.content}</p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
        <div className="w-full h-20 z-50 absolute bottom-0 left-0 bg-white flex items-center justify-between px-4">
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
              onClick={createNewChat}
              className="absolute right-8 text-sm font-semibold text-sky-500 p-1.5 px-4 hover:bg-black/10 rounded-full"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewChat;
