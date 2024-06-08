import { useState } from "react";
import { useSelector } from "react-redux";
import { useEditProfileMutation } from "../redux/api/api";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import axios from "axios";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [popup, setPopup] = useState(false);
  const [image, setImage] = useState("");
  const [bio, setBio] = useState(user?.bio);
  const [websiteLink, setWebsiteLink] = useState("");

  const [editProfile] = useEditProfileMutation();

  const imageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let url;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "insta-cloud");
    formData.append("cloud_name", "dfmcsvthn");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfmcsvthn/image/upload",
        formData
      );
      url = response.data.url;
      console.log(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    const data = {
      profile: url,
      bio,
      websiteLink,
    };
    editProfile(data)
      .unwrap()
      .then((data) => toast.success(data?.message))
      .catch((err) => toast.error(err?.data?.message));
  };

  return (
    <div className="w-full px-6 relative h-screen">
      {popup && (
        <div className="w-full bg-black/40 h-full flex items-center absolute top-0 left-0 p-6">
          <div className="w-full h-72 bg-white rounded-3xl relative flex items-center justify-center">
            <button
              className="top-5 absolute right-5"
              onClick={() => setPopup(false)}
            >
              Close
            </button>
            <label htmlFor="file">
              Choose
              <input type="file" id="file" hidden onChange={imageChange} />
            </label>
          </div>
        </div>
      )}
      <div className="w-full py-2 flex border-b border-black/30">
        back
        <h2 className="w-full text-center">Edit profile</h2>
      </div>
      <div className="w-full flex items-center p-4 rounded-2xl gap-4 bg-zinc-200 mt-10">
        <div className="w-16 h-16 rounded-full bg-white overflow-hidden">
          <img src={user?.profile} alt="" className="w-full h-full" />
        </div>
        <div>
          <h2>{user?.username}</h2>
          <button
            onClick={() => setPopup(true)}
            className="text-sm font-semibold hover:text-zinc-500 transition-all duration-300 text-sky-600"
          >
            Change photo
          </button>
        </div>
      </div>
      <div className="">
        <h3 className="text-sm font-semibold mt-5">Website</h3>
        <div className="w-full">
          <input
            type="text"
            className="px-3 py-2 bg-zinc-200 rounded-xl text-sm w-full mt-2 outline-none"
            placeholder="website..."
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <h3 className="text-sm font-semibold mt-5">Bio</h3>
        <div className="w-full">
          <textarea
            type="text"
            className="px-3 py-2 border-2 resize-none focus:border-black/30 rounded-xl text-sm w-full mt-2 outline-none"
            placeholder="Bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="absolute bottom-12 w-full flex justify-end p-2 right-0">
        <button
          onClick={handleEdit}
          className="w-3/5 text-center py-2 hover:bg-sky-600 transition-all duration-300 bg-sky-500 text-white font-semibold text-sm rounded-md"
        >
          submit
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
