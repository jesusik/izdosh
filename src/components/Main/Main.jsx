import React from "react";
import "./Main.scss";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
// images
import microPhoneLogo from "./../../images/microphone-Logo.svg";
import izdoshLogo from "../../images/izdosh.png";
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
