import { FaRegHeart } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
export const Home = true;

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <header className="absolute z-[99] top-0 w-full bg-white h-12 border-b-[1px] flex items-center px-2 justify-between border-black/45">
        {menu && (
          <div className="w-24 min-h-20 overflow-hidden rounded-lg bg-white absolute shadow top-12 right-4 flex flex-col items-center justify-center">
            <Link
              to="/post/new"
              className="w-full py-1 hover:bg-black/30 text-center"
            >
              Post
            </Link>
            <Link
              to={"/reel/new"}
              className="w-full text-center py-1 hover:bg-black/30"
            >
              Reel
            </Link>
            <Link
              to={"/story/upload"}
              className="w-full text-center py-1 hover:bg-black/30"
            >
              Story
            </Link>
          </div>
        )}
        {Home === true ? (
          <img width="120px" src="./assets/Instagram_logo.svg" alt="" />
        ) : (
          <h2></h2>
        )}
        <div className="flex items-center px-2 justify-between w-20 h-full">
          <button
            to={""}
            onClick={() => setMenu((prev) => !prev)}
            className="w-6 h-6 border-[1px] border-black rounded-md flex justify-center items-center"
          >
            <AiOutlinePlus className="text-xl" />
          </button>
          <Link to="/notifications" className="relative">
            {user?.notifications?.length > 0 && (
              <div className="absolute h-4 w-4 flex items-center justify-center -bottom-1 right-0 rounded-full bg-sky-500 text-white">
                <span className="text-sm">{user?.notifications?.length}</span>
              </div>
            )}
            <FaRegHeart className="text-2xl font-bold" />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
