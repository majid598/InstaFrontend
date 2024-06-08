import axios from "axios";
import { useState } from "react";

const Test = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [video, setVideo] = useState(null);
  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "insta-cloud"); // Replace with your upload preset
    formData.append("resource_type", "video");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dfmcsvthn/video/upload`,
        formData
      );
      const video = response.data.secure_url;
      setVideo(video);
      console.log(video); // Return the Cloudinary URL of the uploaded video
    } catch (error) {
      console.error("Error uploading video to Cloudinary:", error);
      return null;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };
  const handleUpload = async () => {
    if (!videoFile) return;
    const cloudinaryUrl = await uploadVideo(videoFile);
    console.log("Cloudinary URL:", cloudinaryUrl);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>submit</button>
      <video src={video} autoPlay loop></video>
    </div>
  );
};

export default Test;
