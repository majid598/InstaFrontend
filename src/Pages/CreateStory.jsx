import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { HiDownload } from "react-icons/hi";
import { useUploadStoryMutation } from "../redux/api/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateStory = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setUrl(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const [story] = useUploadStoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      caption,
      attachMent,
    };
    story(data)
      .unwrap()
      .then((data) => {
        navigate("/");
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-screen relative">
        {file ? (
          <div className="w-full h-full relative">
            {menu && (
              <div className="bg-black/50 py-40 px-16 absolute top-0 left-0 w-full h-screen">
                <input
                  type="text"
                  className="bg-transparent text-white outline-none p-2"
                  placeholder="Aa..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            )}
            <div className="absolute text-white z-50 w-full flex justify-between top-0 left-0 px-5 py-3">
              <button type="button" className="text-white text-2xl">
                <CgClose />{" "}
              </button>
              <div className="flex gap-4">
                <a href={file} download={file} className="text-white text-2xl">
                  <HiDownload />
                </a>
                <button type="button">fas</button>
                <button type="button">
                  <BiPencil className="text-2xl" />{" "}
                </button>
                <button
                  onClick={() => setMenu((prev) => !prev)}
                  className="text-xl font-semibold relative z-[99]"
                >
                  Aa
                </button>
              </div>
            </div>
            <img src={file} className="w-full h-full" alt="" />
            <div className="bottom-0 absolute w-full px-5 py-3 flex justify-center">
                <button className="text-center text-white font-semibold">Add to your story</button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <label
              htmlFor="file"
              className="cursor-pointer px-5 py-2.5 rounded-md bg-sky-500 text-white font-semibold"
            >
              choose
              <input type="file" hidden onChange={imageHandler} id="file" />
            </label>
          </div>
        )}
      </div>
    </form>
  );
};

export default CreateStory;
