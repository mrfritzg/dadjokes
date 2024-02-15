import { useEffect, useState } from "react";
import { jokesFetch } from "../utils/axiosfetchs";

const Search = () => {
  const [jokes, setJokes] = useState("");
  const [search, setSearch] = useState("");

  // const url = `https://icanhazdadjoke.com/search?term=${search}`;

  useEffect(() => {
    const getJokes = async () => {
      try {
        const res = await jokesFetch(`search?term=${search}`);
        console.log(res.data.results);
        setJokes(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getJokes();
  }, [search]);

  return (
    <main className=" p-5 md:w-2/3 mx-auto">
      <section className="mb-2">
        <h1>SEARCH JOKES</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="bg-white p-2">
        {jokes ? (
          jokes.map((item) => (
            <div className="jokeItem" key={item.id}>
              {item.joke}
            </div>
          ))
        ) : (
          <div className="jokeItem">Jokes Not Found...</div>
        )}
      </section>
    </main>
  );
};
export default Search;
