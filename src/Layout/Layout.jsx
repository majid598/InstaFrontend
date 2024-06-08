import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg--900">
      <h1 className="absolute text-5xl font-bold text-zinc-200 left-8">
        Instagram By Mr Raju
      </h1>
      <div className="lg:w-[20rem] mg:w-[20rem] border-2 border-black/60 sm:w-[20rem] w-full lg:h-[82vh] md:h-[82vh] h-full rounded-lg overflow-hidden relative bg--300">
        <Header />
        <div className="h-full w-full overflow-auto px-0 py-10">
        {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
