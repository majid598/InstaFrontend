import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";

import "swiper/css";
import "swiper/css/pagination";

import "./reels.css";
import { useAllReelsQuery, useLikeReelMutation } from "../redux/api/api";
import { IoHeartOutline } from "react-icons/io5";
import { FaComments } from "react-icons/fa6";
import { BiMessageRounded, BiSend } from "react-icons/bi";
import ReelLoader from "../Components/ReelLoader";
import { useSelector } from "react-redux";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { toast } from "react-toastify";
import Reel from "../Components/Reel";
import axios from "axios";

const Reels = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRefs = useRef([]);
  const { data, isLoading, isError } = useAllReelsQuery();
  const reels = data?.reels;

  const handleSlideChange = (newIndex) => {
    // Pause the previously playing video when the slide changes
    if (playerRefs.current[currentIndex]) {
      playerRefs.current[currentIndex].getInternalPlayer().pause();
    }
    // Update the currentIndex to the new index
    setCurrentIndex(newIndex);
  };

  const handleVideoClick = (index) => {
    const player = playerRefs.current[index].getInternalPlayer();
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  const userId = user?._id;
  useEffect(() => {
    // Function to increment view count for a post
    const incrementViewCount = async (reelId) => {
      try {
        await axios.put(
          `http://localhost:5000/api/v1/post/reel/${reelId}/view`,
          userId
        );
        console.log(`View count incremented for reel ${reelId}`);
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };

    // Loop through the posts and increment view count for each post
    reels?.forEach((reel) => {
      incrementViewCount(reel._id);
    });
  }, [reels, userId]);

  return isLoading ? (
    <ReelLoader />
  ) : (
    <Layout>
      <Swiper
        direction={"vertical"}
        className="mySwiper"
        slidesPerView={1}
        onSlideChange={({ realIndex }) => handleSlideChange(realIndex)}
      >
        {reels?.map((reel, index) => {
          // setIsLiked(reel.likes.includes(user._id));
          return (
            <SwiperSlide>
              <Reel
                reel={reel}
                index={index}
                playerRefs={playerRefs}
                currentIndex={currentIndex}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Layout>
  );
};

export default Reels;
