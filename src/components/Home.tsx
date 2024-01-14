import React from "react";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="home">
      <div className="home__gridContainer">
        <div className="home__gridContainer__notes">
          <h1>Notes</h1>
          
        </div>
        <div className="home__gridContainer__stick">
          <h1>Shared</h1>
        </div>
        <div className="home__gridContainer__item3">
          <h1>Trash</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
