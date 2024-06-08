import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useMyChatsQuery } from "../redux/api/api";

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useMyChatsQuery(user?._id);
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="w-full px-4 flex py-2 justify-between">
          back
          <h2>{user?.username}</h2>
          <h2>
            <BsChatFill />
          </h2>
        </div>
        <div className="">
          <div className="w-full flex mt-2  px-4 font-semibold justify-between">
            <button className="text-sky-500">Primary</button>
            <button>General</button>
            <button>Request</button>
          </div>
          <div className="w-full h-1 mt-2 px-4">
            <div className="bg-zinc-300 w-full h-full">
              <div className="h-full w-1/6 bg-sky-500"></div>
            </div>
          </div>
        </div>
        <div className="py-6">
          {data?.chats?.map((chat, index) => (
            <Link
              to={`/chat/${chat._id}`}
              className="w-full py-2 flex px-4 items-start gap-4 hover:bg-black/20 border-b"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-300 overflow-hidden">
                <img
                  src={
                    chat?.user2?._id === user._id
                      ? chat?.user1?.profile
                      : chat?.user2?.profile
                  }
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <div>
                <h2>
                  {chat?.user2?._id === user._id
                    ? chat?.user1?.username
                    : chat?.user2?.username}
                </h2>
                <h2 className="text-sm">time ago</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
