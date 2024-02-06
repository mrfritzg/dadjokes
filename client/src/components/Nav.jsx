import { NavLink } from "react-router-dom";
import links from "../utils/links";

const Nav = () => {
  // const links = [
  //   { path: "/", name: "Home" },
  //   { path: "/dadjokes", name: "Dad-Jokes" },
  //   { path: "/about", name: "About" },
  // ];
  return (
    <nav className="flex justify-center text-center mb-10">
      <ul className="flex gap-5 text-center">
        {links.map((link) => (
          <li
            className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-red-300"
            key={link.name}
          >
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
