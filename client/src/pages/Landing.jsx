import { useEffect, useState } from "react";
import { jokesFetch, jokesDBFetch } from "../utils/axiosfetchs";
import likes from "../assets/images/likes.png";
import dislikes from "../assets/images/dislikes.png";
import heart from "../assets/images/heart.png";
import plus from "../assets/images/plus.png";
import warning from "../assets/images/warning.png";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await jokesDBFetch("/users/current-user");
    return data;
  } catch (error) {
    return null;
  }
};

const Landing = () => {
  // const data = useLoaderData();
  // console.log(data);
  const [randomJoke, setRandomJoke] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const getRandomJoke = async () => {
    try {
      const res = await jokesFetch();
      // console.log(res.data);
      setRandomJoke(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await jokesDBFetch("/users/current-user");
      console.log(res.data.user);
      setCurrentUser(res.data.user);
    } catch (error) {
      // console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getRandomJoke();
    getUser();
  }, []);

  return (
    <main className="bg-white p-5 md:w-2/3 mx-auto">
      <section className="border-b-4 border-blue-950 pb-2">
        <h1 className="font-bold text-center text-xl">
          Welcome {currentUser?.name} to DAD
          <span className="text-blue-600 transform uppercase">Jokes</span>
        </h1>
        <h3 className="">
          Brought to you by{" "}
          <span className="text-red-700 font-bold">MrFritz</span>{" "}
        </h3>
        <h4>
          You can generate random jokes by{" "}
          <span className="font-bold text-red-700">
            clicking on the button below or refreshing the page.
          </span>
        </h4>
        <p>
          <img src={warning} alt="warning" className="inline-block px-2" />
          <span className="text-red-900 underline">WARNING:</span> Please seek
          medical attention if your eyes don't unroll after 5 minutes{" "}
        </p>
      </section>
      <section className="text-center my-10">
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
          onClick={getRandomJoke}
        >
          Generate Joke
        </button>
        <div className=" m-auto h-40 justify-center items-center flex shadow-2xl">
          <h4 className="p-4 font-bold"> {randomJoke.joke}</h4>
        </div>
        <div className="text-left my-8">
          <h1 className="">COMING SOON...</h1>
          <ul>
            <li>
              Rate Jokes:{" "}
              <span>
                Likes:
                <img
                  className="inline-block px-2"
                  src={likes}
                  alt="thumbs up emoji"
                />
              </span>
              <span>
                DisLikes:
                <img
                  className="inline-block px-2"
                  src={dislikes}
                  alt="thumbs down emoji"
                />
              </span>
            </li>
            <li>
              Add Jokes to Favorites{" "}
              <img
                className="inline-block px-2"
                src={heart}
                alt="heart emoji"
              />
            </li>
            <li>
              Add Your own Jokes to the List{" "}
              <img className="inline-block px-2" src={plus} alt="plus emoji" />
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};
export default Landing;
