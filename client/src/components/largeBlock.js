import React, { useEffect, useState } from "react";
import LineGraph from "./analysisVisuals/linegraph";

import "./mainAnalysis.scss";
import "./largeBlock.scss";

const LargeBlock = (props) => {
  const [data, setData] = useState({});

  function checkInput(textbox) {
    var textInput = parseInt(document.getElementById(textbox).value);
    props.handleCheckInput({ type: textbox, value: textInput });
  }

  function onSubmit() {
    props.handleSubmit();
  }

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className="analysis-cont">
      <div className="largeblock-title">
        <p>Read Quality Distribution</p>
      </div>
      {props.isData ? (
        props.submitted ? (
          props.loading ? (
            <span>loading</span>
          ) : (
            <LineGraph data={data} />
          )
        ) : (
          <div className="user-input-cont">
            <div className="input-row">
              <div className="input-wrapper">
                <span>Minimum Length</span>
                <input
                  type="text"
                  id="length"
                  pattern="[0-9]*"
                  className="number-input"
                  onKeyUp={() => checkInput("length")}
                />
              </div>
              <div className="input-wrapper">
                <span>Minimum Quality</span>
                <input
                  type="text"
                  id="quality"
                  pattern="[0-9]*"
                  className="number-input"
                  onKeyUp={() => checkInput("quality")}
                />
              </div>
            </div>
            <button onClick={onSubmit}>Run</button>
          </div>
        )
      ) : (
        <span>No Data</span>
      )}
    </div>
  );
};

export default LargeBlock;
