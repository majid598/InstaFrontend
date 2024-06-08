import { FaPlus } from "react-icons/fa";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { useAllPostsQuery, useGetStoriesQuery } from "../redux/api/api";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useAllPostsQuery();
  const posts = data?.posts;
  const { data: storyData } = useGetStoriesQuery();
  const stories = storyData?.stories;
  return (
    <Layout>
      <div>
        <div className="w-full border-b border-black/20 relative p-2 pt-6 whitespace-nowrap  overflow-y-hidden overscroll-x-scroll bg-[#FAFAFA]">
          <Link
            to={user?.story ? `/user/story/${user?.story?._id}` : "/profile"}
            className="w-20 h-20 rounded-full bg-zinc-400 relative inline-block mx-3 border-2 border-red-500"
          >
            {user?.story ? (
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={user?.story?.attachMent}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={user?.profile} alt="" className="w-full h-full" />
              </div>
            )}
            {user?.story ? (
              ""
            ) : (
              <Link
                to="/story/upload"
                className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-white rounded-full"
              >
                <FaPlus className="h-5 w-5 bg-sky-500 text-white rounded-full p-1" />
              </Link>
            )}
          </Link>
          {stories?.map((story, index) => (
            <>
              {story._id === user?.story?._id ? (
                ""
              ) : (
                <Link
                  to={`/user/story/${story?._id}`}
                  key={story?._id}
                  className="w-20 h-20 rounded-full bg-zinc-400 border-2 border-red-500 relative inline-block mx-3 overflow-hidden"
                >
                  <img
                    src={story?.attachMent}
                    className="w-full h-full"
                    alt=""
                  />
                </Link>
              )}
            </>
          ))}
        </div>
        <div className="w-full py-10 bg-white overflow-y-scroll flex flex-col gap-4">
          {posts?.map((post, index) => (
            <PostCard key={post?._id} post={post} />
          ))}
          <div className="w-full h-[50vh] flex items-center justify-center">
            No more posts are available now
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
