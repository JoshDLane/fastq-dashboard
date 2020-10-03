import React from "react";
import { FaDownload } from 'react-icons/fa';

import "./downloadFile.scss"

var fileDownload = require("js-file-download");

const DownloadFile = (props) => {
  function download() {
    fileDownload("../../fileExchange/output/filtered.fastq", "filtered.fastq");
  }
  return (
    <div className="download-btn">
      {props.ready ? 
      <div className="clickable" onClick={download}>
         <FaDownload className="download-icon"/>
        <p>Filtered Fastq</p>
      </div> 
      : <p>NOPE</p>}
    </div>
  );
};

export default DownloadFile;
