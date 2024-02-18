import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Camera = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [responseData, setResponseData] = useState(null); // State to store fetched data
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
//getting info
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.example.com/data");
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
//switch
  const handleCameraSwitch = () => {
    setIsFrontCamera((prevState) => !prevState);
    console.log(isFrontCamera);
  };

  const postData = async () => {
    axios.get(url)
    .then(response => {
      setResponseData(response.data.message);
    })
    .catch(error => {
      console.log(error);
    });
  };



  const takePhoto = async () => {
    const width = 414;
    const height = 800;
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
      console.log("Image uploaded successfully:", response.data);
      // fetchData(); // Fetch data after successfully posting the image
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
          <b>5000</b>
        </div>
      )}

      <div className="camera">
        <video onClick={takePhoto} ref={videoRef}></video>
        <button onClick={handleCameraSwitch}>switch</button>
      </div>
      <canvas ref={photoRef} style={{ display: "none" }}></canvas>
    </>
  );
};

export default Camera;
