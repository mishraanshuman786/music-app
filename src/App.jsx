import React, { useState } from "react";
import SongsList from "./components/SongsList";
import { FaFolderOpen } from "react-icons/fa6";

function App() {
  const [audioFiles, setAudioFiles] = useState([]); // Array of audio files

  const handleSelectFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const files = [];

      for await (const entry of dirHandle.values()) {
        if (entry.kind === "file") {
          const file = await entry.getFile();
          const extension = file.name.split(".").pop().toLowerCase();

          // Check if the file extension is audio-related
          if (["mp3", "wav", "ogg"].includes(extension)) {
            files.push(file);
          }
        }
      }

      setAudioFiles(files);
    } catch (error) {
      console.error("Error accessing directory:", error);
    }
  };

  return (
    <div className="w-[100%]  flex flex-col justify-center items-center mt-10">
     
      <h4 className="text-white font-semibold text-[20px]">Select a Folder, where audio files are present.</h4>
      <button className="text-white mt-4 text-[20px] w-[180px] h-[50px] gap-2 mx-auto flex justify-center items-center  rounded-md font-semibold  bg-gradient-to-r from-blue-600 to-violet-600" onClick={handleSelectFolder}><FaFolderOpen />Select Folder</button>
      <SongsList audioFiles={audioFiles} />
      
    </div>
  );
}

export default App;
