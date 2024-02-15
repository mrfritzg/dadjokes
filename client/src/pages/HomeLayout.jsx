import { Outlet } from "react-router-dom";
// import Nav from "../components/Navold";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-between bg-gray-200">
        <div className="flex flex-col justify-between">
          <Nav />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default HomeLayout;
