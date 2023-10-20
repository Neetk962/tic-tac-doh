import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import living_room from "../assets/images/living_room.png";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div>
        <div>
          <div className="flex flex-col m-4 items-center simpsonfont font-extrabold">
            <h2 className="text-6xl">Welcome Home!</h2>
          </div>
          <div className="flex flex-col max-w-full">
            <img className="object-center" id="living_room" src={living_room} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
