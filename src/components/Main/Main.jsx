import React from "react";
import "./Main.scss";
// images
import izdoshLogo from "../../images/izdosh.png";
// components
import Camera from "../Camera/Camera";
const Main = () => {
  return (
    <>
      <div className="main-container">
        <header>
        
          <img src={izdoshLogo} alt="" />
          <p>izdosh</p>
        </header>
        <main>
          <div className="main-wrapper ">
            <Camera></Camera>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
