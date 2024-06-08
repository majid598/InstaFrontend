import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import Search from "./Pages/Search";
import Notifications from "./Pages/Notifications";
import Reels from "./Pages/Reels";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useEffect } from "react";
import { userExists, userNotExists } from "./redux/reducers/userReducer";
import axios from "axios";
import { server } from "./redux/api/api";
import Followers from "./Pages/Followers";
import Following from "./Pages/Following";
import EditProfile from "./Pages/EditProfile";
import NewPost from "./Pages/NewPost";
import OtherUser from "./Pages/OtherUser";
import OtherUserFollowers from "./Pages/OtherUserFollowers";
import OtherUserFollowing from "./Pages/OtherUserFollowing";
import CreateStory from "./Pages/CreateStory";
import Story from "./Pages/Story";
import Test from "./Test";
import NewReel from "./Pages/NewReel";
import GetChat from "./Pages/GetChat";
import NewChat from "./Pages/NewChat";
import GetReel from "./Pages/GetReel";

const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExists(data?.user));
      })
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feeds" element={<Posts />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/post/new" element={<NewPost />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/chats" element={<Chat />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/story/upload" element={<CreateStory />} />
          <Route path="/user/:id" element={<OtherUser />} />
          <Route path="/user/story/:id" element={<Story />} />
          <Route path="/user/followers" element={<Followers />} />
          <Route path="/user/following" element={<Following />} />
          <Route path="/reel/new" element={<NewReel />} />
          <Route path="/user/:id/chat/create" element={<NewChat />} />
          <Route path="/chat/:id" element={<GetChat />} />
          <Route path="/reel/:id" element={<GetReel />} />
          <Route
            path="/other/user/:id/followers"
            element={<OtherUserFollowers />}
          />
          <Route
            path="/other/user/:id/following"
            element={<OtherUserFollowing />}
          />
        </Route>
        <Route element={<ProtectedRoute user={!user} redirect="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
