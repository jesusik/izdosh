import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import buttonClickSound from "../../sounds/cameraSound.mp3"; // Import your button click sound file
import { resolvePath } from "react-router-dom";

const Camera = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const buttonClickAudioRef = useRef(null); // Reference to the audio element
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const url = "http://172.24.200.54:8000/api/v1/image_process/";

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: isFrontCamera ? "user" : "environment",
            height: 1080,
            width: 1920,
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play().catch((error) => {
              console.error("Error playing video:", error);
            });
          });
        }
        setPermissionGranted(true); // Set permission as granted after successful camera initialization
      } catch (error) {
        console.error("Error accessing camera:", error);
        setPermissionGranted(false);
      }
    };
    initializeCamera();
  }, [isFrontCamera]);

  // Function to play button click sound
  const playButtonClickSound = () => {
    if (buttonClickAudioRef.current) {
      buttonClickAudioRef.current.play();
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(url);
  //     setResponseData(response);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const takePhoto = async () => {
    const width = 1080;
    const height = 1900;
    const video = videoRef.current;
    const photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    // Convert canvas image to base64 data URL
    const dataUrl = photo.toDataURL("image/jpeg");

    try {
      const response = await axios.post(url, {
        image: dataUrl,
      });
      console.log("Image uploaded successfully:", response.data.sum);
      setResponseData(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // if no camera access
  if (permissionGranted === false) {
    return (
      <div>
        Camera permission denied. Please grant access to the camera in your
        browser settings.
      </div>
    );
  }

  return (
    <>
      {responseData && (
        <div className="responseData">
          <b>{responseData.sum}</b>
        </div>
      )}

      <div className="camera">
        <video onClick={takePhoto} ref={videoRef}></video>
        <button
          onClick={() => {
            takePhoto();
            playButtonClickSound();
          }}
        >
          takePhoto
        </button>
      </div>
      <canvas ref={photoRef} style={{ display: "none" }}></canvas>
      {/* Audio element for button click sound */}
      <audio ref={buttonClickAudioRef} src={buttonClickSound} />
    </>
  );
};

export default Camera;
