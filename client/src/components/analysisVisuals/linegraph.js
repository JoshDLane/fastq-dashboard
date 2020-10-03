import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import './linegraph.css'


const LineGraph = (props) => {
  const canvasRef = useRef();
  const [data, setData] = useState([]);
  const [width, setWidth] = useState("90%");
  const [height, setHeight] = useState("90%");
  const padding = 60;

  function kernelDensityEstimator(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
      });
    };
  }
  function kernelEpanechnikov(k) {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }
  function getWidth(){
    return this.canvasRef.current.parentElement.offsetWidth;
}
    function getHeight(){
    return this.canvasRef.current.parentElement.offsetHeight;
}
    const canvas = d3.select(canvasRef.current);
    canvas.selectAll("*").remove();
    const svg = canvas
      .append("svg")
      .attr("width", width)
      .attr("class", "svg-cavas")
      .attr("height", height);
  
      var x = d3
      .scaleLinear()
      .domain([0, 45])
      .range([0, width - (padding*2)]);

      var y = d3.scaleLinear().range([height-padding*2, 0]).domain([0, 0.30]);

      var yflat = d3.scaleLinear().range([height-padding*2, 0]).domain([0, 10]);

      var kde = kernelDensityEstimator(kernelEpanechnikov(2), x.ticks(40))
      var density =  kde( data.map(function(d){  return d; }) )
   
    svg
      .append("g")
        .attr("transform", `translate(${padding*1.25},${height - padding*1.25})`)
        .attr("class", "axis")
        .call(d3.axisBottom(x)
        .tickSize(15))
      ;
    svg
      .append("text")             
      .attr("transform",
            `translate(${(width*.5)-50},${height - padding*.25})`)
       .attr("fill", "white")
      .text("Read Quality Score");

      svg.append("g")
        .attr("transform", `translate(${padding*1.25},${padding*.75})`)
        .attr("class", "axis")
        .call(d3.axisLeft(y)
        .tickSize(15)
      );
      svg
      .append("text")        
      .attr("transform",
            `translate(${padding*.25},${(height*.5)+35}) rotate(-90) `)
       .attr("fill", "white")
      .text("Percent Of Reads");

      svg.append("path")
      .attr("class", "mypath")
      .datum(density)
      .attr("fill", "#69b3a2")
      .attr("transform", `translate(${padding*1.25},${padding*.75})`)
      .attr("opacity", ".8")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d[0]); })
      .y(function(d) { return yflat(d[1]); }))
      .attr("stroke-linejoin", "round")
      .call((enter) =>
        enter
          .transition()
          .duration(1200)
            .attr("d",  d3.line()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); })
      )
      );



  useEffect(() => {
    setWidth(window.innerWidth*.6)
    setHeight(window.innerHeight*.6)
    setData(props.data.q_scores);
  }, [props.data]);

  return (
    <div className="svg-container" ref={canvasRef}/>
    );
};

export default LineGraph;
