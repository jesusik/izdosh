import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Camera = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: isFrontCamera ? "user" : "environment", // 'user' for front camera, 'environment' for back camera
      },
    };
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1080, height: 1920 }, constraints
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play().catch((error) => {
              console.error("Error playing video:", error);
            });
          });
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initializeCamera();

    return () => {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isFrontCamera]);

  const handleCameraSwitch = () => {
    setIsFrontCamera((prevState) => !prevState);
  };

  const takePhoto = async () => {
    const width = 414;
    const height = width / (9 / 16);
    const video = videoRef.current;
    const photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    // Convert canvas image to base64 data URL
    const dataUrl = photo.toDataURL("image/jpeg");

    // Send dataUrl to server using Axios
    try {
      const response = await axios.post("https://httpbin.org/post", {
        image: dataUrl,
      });
      console.log("Image uploaded successfully:", response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <>
      <div className="camera">
        <video onClick={takePhoto} ref={videoRef} autoPlay></video>
        <button onClick={handleCameraSwitch}>switch</button>
      </div>
      <canvas ref={photoRef} style={{ display: "none" }}></canvas>
    </>
  );
};

export default Camera;
