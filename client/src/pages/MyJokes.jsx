import { useLoaderData } from "react-router-dom";
import { jokesDBFetch } from "../utils/axiosfetchs";

export const loader = async () => {
  try {
    const { currentUserData } = await jokesDBFetch("/users/current-user");
    // console.log(data.user.name);
    return currentUserData;
  } catch (error) {
    return null;
  }
};

const MyJokes = () => {
  const currentUserData = useLoaderData();
  // console.log(data.user.name);
  return (
    <main className="bg-white p-5 md:w-2/3 mx-auto">
      <section>
        <h1 className="font-bold text-center text-xl">Welcome to My Jokes </h1>
        <div>
          <h1 className="text-xl">
            {currentUserData?.user?.name}'s Favorite Jokes
          </h1>
        </div>
        <div>
          <h1 className="text-xl">
            {currentUserData?.user?.name}'s Created Jokes
          </h1>
        </div>
      </section>
    </main>
  );
};
export default MyJokes;
