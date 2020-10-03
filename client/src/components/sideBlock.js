import React, { useEffect, useState } from "react";
import BucketGraph from './analysisVisuals/bucketGraph'

import "./sideBlock.scss";

const SideBlock = (props) => {
  const [value, setValue] = useState(0);

    function setDataHandler() {
        if (props.title === 'Total Reads'){
                return props.data.stats.total_reads
          } else if(props.title === 'Passing Reads'){
              if(props.data.stats.valid_reads){
                return props.data.stats.valid_reads
              }else{
                  return 0
              }
            } else if(props.title === 'Failed on Quality'){
                if(props.data.stats.low_qual_reads){
                    return props.data.stats.low_qual_reads
                }else {
                    return 0
                }
            } else{
                if (props.data.stats.short_reads){
                   return props.data.stats.short_reads
                } else{
                    return 0
                }
            }
        }
          

  useEffect(() => {

    // setFailedHandler()
  }, [props.data, props.title]);

  return (
    <div className="sideblock-wrapper">
      <div className="sideblock-title">
        <p>{props.title}</p>
      </div>
      <div className="value-cont">

      {props.isData ? (
        props.submitted ? (
          props.loading ? (
            <span>loading</span>
          ) : (
                    <span>{setDataHandler()}</span>
          )
        ) : (
          <span>No Data</span>
        )
      ) : (
        <span>No Data</span>
      )}
    </div>
    </div>
  );
};

export default SideBlock;
