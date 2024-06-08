import { useState } from "react";
import { useSelector } from "react-redux";
import { useNewPostMutation } from "../redux/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReelLoader from "../Components/ReelLoader";

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [newPost] = useNewPostMutation();

  const [title, setTitle] = useState("");
  const [captionText, setCaptionText] = useState("");

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setUrl(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let attachMent;
    const formData = new FormData();
    formData.append("file", url);
    formData.append("upload_preset", "insta-cloud");
    formData.append("cloud_name", "dfmcsvthn");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfmcsvthn/image/upload",
        formData
      );
      attachMent = response.data.url;
      console.log(attachMent);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    const data = {
      userId: user._id,
      title,
      caption: captionText,
      attachMent,
    };
    newPost(data)
      .unwrap()
      .then((data) => {
        setIsLoading(false);
        navigate("/profile");
        toast.success(data?.message);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.data?.message);
      });
  };

  return (
    <div className="w-full min-h-screen">
      {isLoading && <ReelLoader />}

      <div className="w-full px-4 py-3 flex justify-between">
        Back
        <h2 className="">New Post</h2>
        <button
          className="text-sm text-sky-500 font-semibold"
          onClick={submitHandler}
        >
          Share
        </button>
      </div>
      <div className="w-full px-4 py-4 flex justify-between items-center h-24">
        <div className="h-full flex items-center w-1/12">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={user?.profile} className="w-full h-full" alt="" />
          </div>
        </div>
        <div className="h-full w-2/3">
          <input
            type="text"
            className="w-full h-full outline-none"
            placeholder="Add title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-1/6 p-3 h-full px-4">
          <div className="w-full h-full">
            {url ? (
              <img src={previewUrl} alt="" className="w-full h-full" />
            ) : (
              <label
                htmlFor="file"
                className=" cursor-pointer hover:bg-sky-300 rounded-lg p-2 transition-all duration-300 font-semibold"
              >
                Choose
                <input type="file" hidden id="file" onChange={imageHandler} />
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="w-full px-4 mt-5 py-2 text-sm flex justify-between border-t border-b mb-2 border-black/30">
        Add Location
        <button className="text-sm text-sky-500 font-semibold">go</button>
      </div>
      <div className="w-full px-4 py-2 text-sm flex justify-between border-t border-b mb-2 border-black/30">
        Tag Peaple
        <button className="text-sm text-sky-500 font-semibold">go</button>
      </div>
      <div className="w-full px-4 py-2 text-sm flex justify-between border-t border-b mb-2 border-black/30">
        Addvanced Settings
        <button
          onClick={() => setCaption((prev) => !prev)}
          className="text-sm text-sky-500 font-semibold"
        >
          go
        </button>
      </div>
      {caption && (
        <div className="w-full px-4 mt-4">
          <input
            type="text"
            className="w-full outline-none p-2"
            placeholder="Add caption"
            value={captionText}
            onChange={(e) => setCaptionText(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default NewPost;
