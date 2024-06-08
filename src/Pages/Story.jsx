import { useNavigate, useParams } from "react-router-dom";
import { useGetStoryQuery } from "../redux/api/api";
import { useEffect } from "react";
import moment from "moment";
import { CgClose } from "react-icons/cg";
import Layout from "../Layout/Layout";

const Story = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const { data, isLoading, isError } = useGetStoryQuery(id);
  const story = data?.story;

  const timeAgo = (createdAt) => {
    return moment(createdAt).fromNow(); // Calculate time ago using moment.js
  };

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <Layout>
      <div className="w-full h-full relative">
        <div className="absolute top-2 px-2 w-full h-0.5">
          <div className="bg-white/40 w-full h-full">
            <div className="bg-white line w-0 h-full"></div>
          </div>
        </div>
        <div className="top-1 absolute left-0 px-4 py-3 flex justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 border border-white rounded-full overflow-hidden">
              <img
                src={story?.user?.profile}
                className="w-full h-full"
                alt=""
              />
            </div>
            <h2 className="text-white text-sm">{story?.user?.username}</h2>{" "}
            <span className="text-zinc-100">{timeAgo(story?.createdAt)}</span>
          </div>
          <div>
            <button onClick={() => navigate("/")}>
              <CgClose className="text-3xl text-white" />
            </button>
          </div>
        </div>
        <img src={story?.attachMent} className="w-auto h-full" alt="" />
      </div>
    </Layout>
  );
};

export default Story;
