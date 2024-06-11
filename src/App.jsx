import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Loader } from "./Components/ReelLoader";
import Chat from "./Pages/Chat";
import CreateStory from "./Pages/CreateStory";
import EditProfile from "./Pages/EditProfile";
import Followers from "./Pages/Followers";
import Following from "./Pages/Following";
import GetChat from "./Pages/GetChat";
import GetReel from "./Pages/GetReel";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewChat from "./Pages/NewChat";
import NewPost from "./Pages/NewPost";
import NewReel from "./Pages/NewReel";
import Notifications from "./Pages/Notifications";
import OtherUser from "./Pages/OtherUser";
import OtherUserFollowers from "./Pages/OtherUserFollowers";
import OtherUserFollowing from "./Pages/OtherUserFollowing";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import Reels from "./Pages/Reels";
import Search from "./Pages/Search";
import Signup from "./Pages/Signup";
import Story from "./Pages/Story";
import Test from "./Test";
import { server } from "./redux/api/api";
import { userExists, userNotExists } from "./redux/reducers/userReducer";

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

  return loader ? (
    <Loader />
  ) : (
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
