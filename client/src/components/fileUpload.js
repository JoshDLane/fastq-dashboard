import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from 'react-icons/fa';

import "./fileUpload.scss";

function FileUpload(props) {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("No File Selected");
  const [uploadedFileName, setUploadedFileName] = useState({});
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selected, setSelected] = useState(false)
  const onChange = (e) => {
    setSelected(true)
    props.onUploadChange(false);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    props.onUploadChange(false);

    e.preventDefault();
    const formData = new FormData();
    formData.append("fastq", file);

    try {
      console.log("trying to post");
      const res = await axios.post(
        "http://localhost:5000/uploadFastq",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { fileName, filePath } = await res.data;
      setUploadedFileName(fileName);
      props.onUploadChange(true);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("there was a problem with server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <form className="form-cont" onSubmit={onSubmit}>
        <div className="file-name-cont">
        <span className="file-name">{filename}</span>
      </div>
      <div className="upload-btn">
        <input
          type="file"
          className="file-input"
          id="customFile"
          onChange={onChange}
        />
        <FaUpload className="upload-icon"/>
      </div>
      <input type="submit" value="Upload" className="sub-btn" />
    </form>
  );
}

export default FileUpload;
