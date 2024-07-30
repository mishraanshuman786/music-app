# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## **The summary of this project is given below:**
In this project i want to implement a music app where the website asks the user to select perticular folder where the audio files are available and when the user selects a folder and website automatically reads all the audio related files and show in the listing format in the website. And when the user clicks on any song the song gets played. And the user can also change the songs on one click.
In this code for selecting the folder i have used the **window.showDirectoryPicker()** because the input type "file" not supports the folder selection, it can only supports the files selection.

## **Code for folder selection and getting the files are:**

  

      const [audioFiles,  setAudioFiles] =  useState([]);  // Array of audio files
    
    const [currentSong,  setCurrentSong] =  useState(null);
    
    const [songKey,  setSongKey] =  useState(0);  // Key for the audio element to force reload
    
      
    
    const  handleSelectFolder  =  async () => {
    
    try {
    
    const  dirHandle  =  await  window.showDirectoryPicker();
    
    const  files  = [];
    
      
    
    for  await (const  entry  of  dirHandle.values()) {
    
    if (entry.kind  ===  'file') {
    
    const  file  =  await  entry.getFile();
    
    const  extension  =  file.name.split('.').pop().toLowerCase();
    
      
    
    // Check if the file extension is audio-related
    
    if (['mp3',  'wav',  'ogg'].includes(extension)) {
    
    files.push(file);
    
    }
    
    }
    
    }
    
      
    
    setAudioFiles(files);
    
    } catch (error) {
    
    console.error('Error accessing directory:',  error);
    
    }
    
    };
    
      
    
    const  handleSongClick  = (song) => {
    
    setCurrentSong(URL.createObjectURL(song));
    
    setSongKey(prevKey  =>  prevKey  +  1);  // Increment key to force reload
    
    };
## **Problems and their solutions:**
Firstly, there is not url present in the files , and the audio tag requires the url url to play the audio. So, for that i have used URL.createObjectUrl(song) to generate a unique url every time when i play a perticular file. It solves the path problem.
And the second problem is that, when i change the song, the song not getting change because of audio tag not getting refreshed.
So, for that i have used a state variable class songKey and initialize it with 0, and when i changes the song the value of this i also change. and link this state with the audio tag using key props. So, when the key changes the audio tag gets refreshed. 
