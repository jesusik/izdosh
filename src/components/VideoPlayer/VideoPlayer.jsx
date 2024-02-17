

import React, { useEffect, useState } from 'react';
import './VideoPlayer.scss';

const VideoPlayer = () => {
    const [frame, setFrame] = useState(null);

    useEffect(() => {
        const fetchFrame = async () => {
            try {
                const response = await fetch('/process_frames', { method: 'POST' });
                const data = await response.json();

                if (data.status === 'success') {
                    setFrame(data.frame);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const intervalId = setInterval(fetchFrame, 40); // Adjust the interval to achieve the desired frame rate (25 fps = 40 ms delay)

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const videoSource = frame ? URL.createObjectURL(new Blob([frame], { type: 'image/jpeg' })) : '';

    return (
        <video src={videoSource}  autoPlay controls />
    );
};

export default VideoPlayer;
