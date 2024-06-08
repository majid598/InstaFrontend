import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { BsPlay } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";

const ContentDisplay = ({ src }) => {
  const [contentType, setContentType] = useState(null);
  useEffect(() => {
    const getResourceType = async () => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const type = blob.type.startsWith("image/")
          ? "photo"
          : blob.type.startsWith("video/")
          ? "video"
          : "unknown";
        setContentType(type);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };

    getResourceType();
  }, [src]);

  if (!contentType) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full">
      {contentType === "photo" && (
        <img src={src} className="w-full h-full" alt={src} />
      )}
      {contentType === "video" && (
        <div className="w-full h-full relative">
          <FaPlay className="text-xl absolute top-2 right-2 text-white"/>
          <video muted src={src} className="w-full h-full" />
        </div>
      )}
      {contentType === "unknown" && <div>Unsupported content type</div>}
    </div>
  );
};

export default ContentDisplay;
