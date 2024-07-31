import React, { useState, useRef, useEffect } from "react";
import songImage from "../../utils/imageJson.js";
import { playAnimation, pauseOrEndAnimation } from "../../animations/absoluteAnimation.js";
import { FaVolumeHigh } from "react-icons/fa6";
import { IoPlayCircleSharp } from "react-icons/io5";
import { FaCirclePause } from "react-icons/fa6";
import "./SongList.css";

const SongsList = ({ audioFiles }) => {
  const audioRef = useRef(null);
  const img1 = useRef();
  const img2 = useRef();
  const img3 = useRef();
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongName,setCurrentSongName]=useState({id:0,songName:"",songImage:""});
  const [songKey, setSongKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Volume range from 0 to 1

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handlePlay = () => {
        playAnimation(img1.current, img2.current, img3.current);
        setIsPlaying(true);
      };

      const handlePause = () => {
        pauseOrEndAnimation(img1.current, img2.current, img3.current);
        setIsPlaying(false);
      };

      const handleEnded = () => {
        pauseOrEndAnimation(img1.current, img2.current, img3.current);
        setIsPlaying(false);
      };

      const updateCurrentTime = () => {
        setCurrentTime(audioElement.currentTime);
      };

      const updateDuration = () => {
        setDuration(audioElement.duration);
      };

      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("ended", handleEnded);
      audioElement.addEventListener("timeupdate", updateCurrentTime);
      audioElement.addEventListener("loadedmetadata", updateDuration);
      console.log("current song: "+currentSong)

      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("ended", handleEnded);
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
        audioElement.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audioRef.current, songKey]);

  async function handleSongClick(song) {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      let songId=Math.round(Math.random()*10);
      let image=songImage(songId);
      console.log("song Image:"+image)
      setCurrentSongName({id:songId,songName:song.name,songImage:image})
      console.log("song Name:"+currentSongName)
      audioRef.current.src = "";
    }
    setCurrentSong(URL.createObjectURL(song));
    setSongKey((prevKey) => prevKey + 1);
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
    }
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
      setVolume(e.target.value);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

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
          <div className="audio-player">
            <audio
              key={songKey}
              ref={audioRef}
              style={{ display: "none" }} // Hide default controls
            >
              <source src={currentSong} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="custom-controls">
            
              <h3 key={currentSongName.id} className="text-white text-[18px]">{currentSongName.songName}</h3>
              <img src={currentSongName.songImage} className="rounded-md" alt="song image" width={200} height={200} />
              <div className="flex gap-4 items-center">
                <button onClick={togglePlayPause} className="play-pause-button text-[40px] rounded-md">
                  {isPlaying ? <FaCirclePause /> : <IoPlayCircleSharp />}
                </button>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="seek-bar"
                />
                <div className="time-display text-[20px]">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-blue-800 text-[30px]"><FaVolumeHigh /></span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-bar"
                />
                <span className="volume-display text-white text-[20px]">{Math.round(volume * 100)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
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
        style={{ display: "none" }}
        width={200}
        alt="disc"
        className="absolute top-[-50px] left-[-50px]"
      />
      <img
        src="/images/tones.gif"
        ref={img3}
        style={{ display: "none", zIndex: -10 }}
        alt="disc"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default SongsList;
