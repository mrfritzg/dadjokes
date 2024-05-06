import { NavLink } from "react-router-dom";
import links from "../utils/links";
import burgerMenu from "../assets/images/menu.svg";
import { useMyJokesContext } from "../pages/MyJokes";
import NavLinks from "./NavLinks";

const Nav = () => {
  const showMenu = () => {
    document.getElementById("menu").classList.toggle("hidden");
  };

  // const { currentUserData, logoutUser } = useMyJokesContext();

  return (
    <nav className="w-full md:w-2/3 bg-white dark:bg-black dark:text-white flex flex-col md:flex-row items-center md:justify-between px-6 py-4 border-b border-b-gray-60 shadow-sm max-w-screen-2xl mx-auto mb-5">
      {/* -- Logo -- */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          <NavLink to="/">
            DAD
            <span className="text-blue-600 transform uppercase">Jokes</span>
          </NavLink>
        </h2>
        <div className="px-4 cursor-pointer md:hidden" id="burger">
          <img
            src={burgerMenu}
            alt="menu icon"
            className="w-8"
            onClick={showMenu}
          />
        </div>
      </div>
      {/* -- /End Logo -- */}
      {/* <div className="hidden md:block mt-5 md:mt-0" id="menu">
        <ul className="flex flex-col md:flex-row md:space-x-5 w-full items-center">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                className="font-semibold tracking-tight block cursor-pointer p-2 border-b-2 border-white hover:text-blue-500 transition-colors duration-300 hover:border-b-2 hover:border-blue-950"
                to={link.path}
                end
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div> */}
      <NavLinks />
    </nav>
  );
};
export default Nav;
