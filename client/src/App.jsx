import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Error,
  Search,
  About,
  MyJokes,
  Register,
  Login,
} from "./pages";

// Register form sumbit action
import { action as registerAction } from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "Myjokes",
        element: <MyJokes />,
      },
      {
        path: "Register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "Login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
