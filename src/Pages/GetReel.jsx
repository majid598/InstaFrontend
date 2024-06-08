import { useParams } from "react-router-dom";
import { useGetReelByIdQuery } from "../redux/api/api";
import Layout from "../Layout/Layout";

const GetReel = () => {
  const reelId = useParams().id;
  const { data } = useGetReelByIdQuery(reelId);
  return (
    <Layout>
      <div className="w-full h-full bg-red-400">
        <video
          autoPlay
          loop
          src={data?.reel?.attachMent}
          className="w-full h-full"
        ></video>
      </div>
    </Layout>
  );
};

export default GetReel;
