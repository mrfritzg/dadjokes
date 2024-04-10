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

// Actions from data forms
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";

//Loaders
import { loader as landingLoader } from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
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
        action: loginAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
