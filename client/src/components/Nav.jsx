import { NavLink } from "react-router-dom";
import links from "../utils/links";

const Nav = () => {
  // const links = [
  //   { path: "/", name: "Home" },
  //   { path: "/dadjokes", name: "Dad-Jokes" },
  //   { path: "/about", name: "About" },
  // ];
  return (
    <nav>
      <ul className="navUl">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
