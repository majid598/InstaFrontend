import { FaSearch } from "react-icons/fa";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

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
          className={`bg-${location.pathname === "/reels" ? "black" : "white"}`}
          to={"/reels"}
        >
          <svg
            aria-label="Reels"
            className={`x1lliihq x1n2onr6 x5n08af`}
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <line
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              x1="2.049"
              x2="21.95"
              y1="7.002"
              y2="7.002"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="13.504"
              x2="16.362"
              y1="2.001"
              y2="7.002"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="7.207"
              x2="10.002"
              y1="2.11"
              y2="7.002"
            ></line>
            <path
              d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
            <path
              d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
              fill-rule="evenodd"
            ></path>
          </svg>
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
