import Layout from "../Layout/Layout";

const ReelLoader = ({ message }) => {
  return (
    <Layout>
      <div className="w-full h-screen fixed flex-col bottom-0 left-0 bg-black/40 flex items-center justify-center">
        <div className="loader w-20 h-20 rounded-full border-2 border-white border-b-white/30"></div>
        <h2 className="mt-2 text-white font-semibold text-2xl">{message}</h2>
      </div>
    </Layout>
  );
};

export default ReelLoader;
