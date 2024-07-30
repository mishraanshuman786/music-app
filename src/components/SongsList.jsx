import React, { useState, useRef, useEffect } from "react";
import { playAnimation, pauseOrEndAnimation } from "../../animations/absoluteAnimation.js";

const SongsList = ({ audioFiles }) => {
  const audioRef = useRef(null);
  const img1 = useRef();
  const img2 = useRef();
  const img3 = useRef();
  const [currentSong, setCurrentSong] = useState(null);
  const [songKey, setSongKey] = useState(0); // Key for the audio element to force reload

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handlePlay = () => {
        playAnimation(img1.current, img2.current, img3.current);
      };

      const handlePause = () => {
        pauseOrEndAnimation(img1.current, img2.current, img3.current);
      };

      const handleEnded = () => {
        pauseOrEndAnimation(img1.current, img2.current, img3.current);
      };

      // Add event listeners
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("ended", handleEnded);

      // Cleanup function
      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioRef.current, songKey]); // Dependency on audioRef.current and songKey

  async function handleSongClick(song) {
    // Stop the currently playing song if there is one
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Clear the source
    }
    // Set the new song
    setCurrentSong(URL.createObjectURL(song));
    setSongKey((prevKey) => prevKey + 1); // Increment key to force reload
  }

  return (
    <div className="w-full flex">
      <ul className="text-white w-[50%] mt-[50px] flex flex-col items-center font-semibold">
        {audioFiles && audioFiles.length > 0 ? (
          audioFiles.map((audio, index) => (
            <li
              key={index}
              className="border bg-blue-800 hover:bg-blue-950 rounded-md p-2 border-yellow-600 w-[80%]"
              onClick={() => handleSongClick(audio)}
            >
              {audio.name}
            </li>
          ))
        ) : (
          <h3 className="text-white text-[20px]">
            Please select a folder to show the List of Songs.
          </h3>
        )}
      </ul>
      <div className="w-[50%] flex flex-col items-center">
        {currentSong && (
          <audio
            key={songKey}
            ref={audioRef} // Attach ref to the audio element
            controls
          >
            <source src={currentSong} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        <img src="/images/player.webp" alt="player" width={400} height={100} />
      </div>
      {/* Absolute items */}

      <img
        src="/images/disc.webp"
        alt="disc"
        ref={img1}
        id="img1"
        style={{ display: "none" }}
        width={200}
        height={200}
        className="absolute top-[-50px] left-[-50px]"
      />
      <img
        src="/images/tones.gif"
        ref={img2}
        style={{ display:"none" }}
        width={200}
        alt="disc"
        className="absolute top-[-50px] left-[-50px]"
      />
      <img
        src="/images/tones.gif"
        ref={img3}
        style={{ display:"none", zIndex: -10 }}
        alt="disc"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default SongsList;
