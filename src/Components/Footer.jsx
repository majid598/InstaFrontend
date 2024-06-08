import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaFacebookMessenger, FaPlay, FaSearch } from "react-icons/fa";
import { VscDiffAdded } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";

const Footer = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <footer className="absolute bottom-0 h-12 flex items-center justify-between px-6 w-full bg-white border-t-[1px] border-black/45">
        <Link className="text-2xl" to={"/"}>
          {location.pathname === "/" ? <GoHomeFill /> : <GoHome />}
        </Link>
        <Link className="" to={"/search"}>
          <FaSearch className="text-xl" />
        </Link>
        <Link
          className={`border-[1px] h-5 rounded-md w-5 flex items-center justify-center border-black/90 bg-${
            location.pathname === "/reels" ? "black" : "white"
          }`}
          to={"/reels"}
        >
          <FaPlay
            className={`text-[10px] ${
              location.pathname === "/reels" ? "text-white" : "text-black"
            }`}
          />
        </Link>
        <Link className="border-black/90" to={"/reels"}>
          <VscDiffAdded className="text-2xl" />
        </Link>
        <Link to={"/chats"}>
          {location.pathname === "/chats" ? (
            <RiMessengerFill className="text-2xl" />
          ) : (
            <RiMessengerLine className="text-2xl" />
          )}
        </Link>
        <Link
          className="w-6 h-6 overflow-hidden rounded-full bg-zinc-400"
          to={"/profile"}
        >
          <img
            className=" object-cover object-top"
            src={user?.profile}
            alt=""
          />
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
