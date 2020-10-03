import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import "./bucketGraph.scss"


const BucketGraph = (props) => {
  const canvasRefBucket = useRef()
  const [data, setData] = useState({});
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(4000);

  const id = props.type

  const canvas = d3.select(`#${id}`);

  const svg = canvas.append("svg").attr("width", width).attr("height", height);
  
  svg.append("rect")
    .attr("x",100)
    .attr('y', 100)
  .attr("width", 1000)
  .attr("height", 1000)
  .style("fill", "red");

  svg.append("rect")
    .attr("width", 1000)
    .attr("height", 1000)
    .attr("fill", "red");


  useEffect(() => {
    setData(data);
  }, [props.data]);

  return <div id={id} className="svg-container-bucket" ref={canvasRefBucket}></div>;
};

export default BucketGraph;
