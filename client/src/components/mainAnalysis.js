import React, { useEffect, useState } from "react";
import axios from "axios";
import LargeBlock from "./largeBlock";
import SideBlock from "./sideBlock";
import DownloadFile from "./downloadFile"
import { json } from "d3";

import "./mainAnalysis.scss";


function Analysis(props) {
  const [data, setData] = useState("nothing back yet");
  const [minQual, setMinQual] = useState(30);
  const [minLength, setMinLength] = useState(100);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function checkInput(info) {
    if (info.type === "length") {
      setMinLength(info.value);
    } else {
      setMinQual(info.value);
    }
  }
  const completeAnalysis = () => {
    if (props.isData=== true){
      if(submitted=== true){
        if(loading === false){
          return true
        }
      }
    }else{
      return false
    }
  }
  const onSubmit = async () => {
    setSubmitted(true);
    setLoading(true);
    try {
      console.log("trying to post");
      const res = await axios.post("http://localhost:5000/analyzeFastq", {
        min_len: minLength,
        min_qual: minQual,
      });
      const { message } = await res.data;
      const test = message.replace(/'/g, '"');
      const parsed = await JSON.parse(test);
      setData(parsed);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("there was a problem with server");
      } else {
        console.log("error");
      }
    }
  };
  useEffect(() => {
    if (props.isData === false) {
      setSubmitted(false);
    }
  }, [props.isData]);

  return (
    <div className="graphs-wrapper">
      <div className="side-analysis">
        <SideBlock
          title="Total Reads"
          data={data}
          isData={props.isData}
          submitted={submitted}
          loading={loading}
        />
        <SideBlock
          title="Passing Reads"
          data={data}
          isData={props.isData}
          submitted={submitted}
          loading={loading}
        />
        <SideBlock
          title="Failed on Length"
          data={data}
          isData={props.isData}
          submitted={submitted}
          loading={loading}
        />
        <SideBlock
          title="Failed on Quality"
          data={data}
          isData={props.isData}
          submitted={submitted}
          loading={loading}
        />
        <DownloadFile
          ready={completeAnalysis}/>
      </div>
      <div className="largblock-wrapper">
        <LargeBlock
          handleCheckInput={(info) => checkInput(info)}
          handleSubmit={() => onSubmit()}
          data={data}
          submitted={submitted}
          loading={loading}
          isData={props.isData}
        />
      </div>
    </div>
  );
}

export default Analysis;
