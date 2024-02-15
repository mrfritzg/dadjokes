import { useEffect, useState } from "react";
import { jokesFetch } from "../utils/axiosfetchs";

const Landing = () => {
  const [randomJoke, setRandomJoke] = useState({});
  const getRandomJoke = async () => {
    try {
      const res = await jokesFetch();
      console.log(res.data);
      setRandomJoke(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRandomJoke();
  }, []);

  return (
    <main className="bg-white p-5 md:w-2/3 mx-auto">
      <section className="border-b-4 border-blue-950 pb-2">
        <h1 className="font-bold text-center">Welcome to DadJokes</h1>
        <h3 className="text-end">
          brought to you by{" "}
          <span className="text-red-700 font-bold">MrFritz</span>{" "}
        </h3>
        <h4>
          You can generate random jokes by clicking on the button below or
          refreshing the page
        </h4>
      </section>
      <section className=" text-center my-10">
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
          onClick={getRandomJoke}
        >
          Random Joke
        </button>
        <div className="bg-gray-100 m-auto h-40 justify-center items-center flex shadow-lg border-2 border-blue-950">
          <h4 className="p-4 font-bold"> {randomJoke.joke}</h4>
        </div>
      </section>
    </main>
  );
};
export default Landing;
