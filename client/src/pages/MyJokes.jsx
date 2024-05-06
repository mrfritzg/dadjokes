import {
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { jokesDBFetch } from "../utils/axiosfetchs";
import { toast } from "react-toastify";
import { createContext, useContext, useEffect, useState } from "react";

export const loader = async () => {
  try {
    const data = await jokesDBFetch("/users/current-user");
    const jokes = await jokesDBFetch("/jokes/myjokes");
    // console.log(jokes);
    const userJokes = jokes.data;
    const currentUserData = data.data;
    // console.log(userJokes, userData);
    return { userJokes, currentUserData };
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

const MyJokesContext = createContext();

const MyJokes = () => {
  const { userJokes, currentUserData } = useLoaderData();
  // console.log(currentUserData);
  const myJokes = userJokes?.jokes;

  const navigate = useNavigate();

  // adding navigation for Loading component spinner animation
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const logoutUser = async () => {
    navigate("/");
    await jokesDBFetch("/auth/logout");
    toast.success("Logging Out...");
  };

  return (
    <MyJokesContext.Provider
      value={{
        currentUserData,
        logoutUser,
      }}
    >
      <main className="bg-white p-5 md:w-2/3 mx-auto">
        <section>
          <h1 className="font-bold text-center text-3xl my-5">
            Welcome to My Jokes{" "}
          </h1>
          <p className="font-bold text-2xl my-4">
            Hi {currentUserData?.user?.name}, Here are your Jokes
          </p>
          <div className="my-6">
            <h1 className="text-xl my-2">Your Favorite Jokes</h1>
            {myJokes.length > 0 ? (
              myJokes.map((item) => (
                <div className="jokeItem" key={item._id}>
                  {item.body}
                </div>
              ))
            ) : (
              <div className="jokeItem text-red-600 font-bold text-xl">
                Jokes Not Found...
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl my-2">Your Created Jokes</h1>
          </div>
        </section>
      </main>
    </MyJokesContext.Provider>
  );
};
// custom hook for the context for the data
export const useMyJokesContext = () => useContext(MyJokesContext);

export default MyJokes;
