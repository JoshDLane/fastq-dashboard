import React, {useState} from 'react';
import FileUpload from './components/fileUpload';
import Analysis from './components/mainAnalysis'

import './App.css';

function App() {
  const [dataUploaded, setDataUploaded] = useState(false)

  function handleUploadStatus(status){
    console.log('setting data status')
    setDataUploaded(status)
  }

  return (
      <div className="app-container">
        <FileUpload onUploadChange={(status) => handleUploadStatus(status)}/>
        <Analysis isData={dataUploaded}/>
      </div>
  );
}

export default App;
