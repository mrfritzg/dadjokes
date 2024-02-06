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
    <main>
      <section className="landing section1">
        <div>
          <h1 className="text-red-700 mb-3">Welcome to DadJokes</h1>
          <h3>
            brought to you by{" "}
            <span className="text-red-700 font-bold">MrFritz</span>{" "}
          </h3>
          <h4>
            You can generate random jokes by clicking on the button below or
            refreshing the page
          </h4>
        </div>
      </section>
      <section className=" text-center mt-10">
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
          onClick={getRandomJoke}
        >
          Random Joke
        </button>
        <div className="bg-white m-auto h-40 justify-center items-center flex shadow-lg">
          <h4> {randomJoke.joke}</h4>
        </div>
      </section>
    </main>
  );
};
export default Landing;
