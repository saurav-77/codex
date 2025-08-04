import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-[#1c2029] w-full h-screen text-white flex flex-col items-center justify-center">
      <img src="/codexlogo.png" alt="" className="mb-4" />
      <Link
        to="/ide"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg flex justify-center items-center h-8 w-25 text-sm px-10 py-2.5 me-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
