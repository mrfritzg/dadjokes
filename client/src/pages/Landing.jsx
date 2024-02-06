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
          <h1>Welcome to the DadJokes page</h1>
          <h3>brought to you by MrFritz</h3>
          <h4>
            You can generate random jokes by clicking on the button below or
            refreshing the page
          </h4>
        </div>
      </section>
      <section className="randomResults">
        <h2>Joke: </h2>
        <button className="randomSearchButton" onClick={getRandomJoke}>
          Random Joke
        </button>
        <div className="randomJoke">
          <h4> {randomJoke.joke}</h4>
        </div>
      </section>
    </main>
  );
};
export default Landing;
