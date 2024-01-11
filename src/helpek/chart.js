import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

const CollectData = ({ statisticsMonth }) => {
  const chartRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current).select("svg").remove();
    if (statisticsMonth?.length > 0) {
      const margin = { top: 30, right: 30, bottom: 60, left: 120 },
        width = 1400 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .classed("svg-container", true)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr(
          "viewBox",
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //xScale

      const xScale = d3
        .scaleBand()
        .domain(
          statisticsMonth.map(function (d) {
            return d?.dayDate;
          })
        )
        .range([0, width]);
      // .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
      //yScale

      const maxTotal = d3.max(statisticsMonth, function (d) {
        return d?.totalPrice;
      });

      const yScale = d3.scaleLinear().domain([0, maxTotal]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(yScale).ticks(8).tickSize(-width));

      const tooltip = d3
        .select("#collect-chart")
        .append("div")
        .style("position", "absolute")
        .style("padding", "4px 10px")
        .style("border", "1px solid #3333")
        .style("border-radius", "10px")
        .style("background", "#f4f4f4");

      // line

      const line = svg
        .append("path")
        .datum(statisticsMonth)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return xScale(d?.dayDate);
            })
            .y(function (d) {
              return yScale(d?.totalPrice);
            })
        )
        .attr("fill", "none") /// color:#cce5df
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 4)
        .attr("opacity", 0.5);

      const pathLength = line.node()?.getTotalLength();
      const transitionPath = d3.transition().ease(d3.easeSin).duration(2500);
      line
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);

      svg.selectAll("g").selectAll(".domain").style("opacity", 0);
      svg.selectAll(".tick").select("line").style("opacity", 0.2);

      const crircle = svg
        .selectAll("myCrircle")
        .data(statisticsMonth)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return xScale(d?.dayDate);
        })
        .attr("cy", function (d) {
          return yScale(d?.totalPrice);
        })
        .attr("r", 8)
        .attr("fill", "none")
        // .attr("transform", "translate(116,0)")
        .style("opacity", 0.4)
        .style("cursor", "pointer")
        .on("mouseover", function (d, i) {
          tooltip.transition().style("opacity", 1);
          tooltip
            .html(
              `<span>${i?.dayDate}: ${i?.totalPrice?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}</span>`
            )
            .style("left", d?.pageX + "px")
            .style("top", d?.pageY + "px");

          d3.select(this).style("opacity", 0.4);
        })
        .on("mouseout", function () {
          tooltip.transition().style("opacity", 0);
          d3.select(this).style("opacity", 0.7);
        })
        .transition()
        .delay(200)
        .duration(2500);

      crircle.transition().attr("fill", "#69b3a2").delay(200).duration(2500);

      // const colum = svg
      //   .selectAll("myColum")
      //   .data()
      //   .enter()
      //   .append("rect")
      //   .attr("x", function (d) {
      //     return xScale(formatTimeIso(d?.createdAt, DMY));
      //   })
      //   .attr("width", xScale.bandwidth())
      //   .attr("y", function (d) {
      //     return 0;
      //   })
      //   .attr("height", function (d) {
      //     return height;
      //   })
      //   .attr("fill", "#69b3a2")
      //   .attr("stroke", "black")
      //   .attr("stroke-width", 1)
      //   .attr("opacity", 0.5);

      // colum
      //   .transition()
      //   .delay(200)
      //   .duration(2500)
      //   .attr("y", function (d) {
      //     return yScale(d?.totalPrice);
      //   })
      //   .attr("height", function (d) {
      //     return height - yScale(d?.totalPrice);
      //   });
    }
  }, [statisticsMonth]);
  return <Box ref={chartRef} id="collect-chart" />;
};

export default CollectData;
