import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useMyJokesContext } from "../pages/MyJokes";

const NavLinks = () => {
//   const data = useMyJokesContext();
//   console.log(data);

  return (
    <div className="hidden md:block mt-5 md:mt-0" id="menu">
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
    </div>
  );
};
export default NavLinks;
