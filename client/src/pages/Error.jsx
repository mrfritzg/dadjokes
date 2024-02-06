import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! Page Not Found</h3>
          <p>We can't seem to find the page you are looking for</p>
          <Link to="/">back home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h3>Something Went wrong</h3>
        <Link to="/">Back Home</Link>
      </div>
    </>
  );
};
export default Error;
