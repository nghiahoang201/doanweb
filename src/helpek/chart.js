import * as d3 from "d3";
import { DMY, formatTimeIso } from "./formatTime";

// const data = [
//   {
//     date: "1/2023",
//     total: 1000,
//   },
//   {
//     date: "2/2023",
//     total: 5000,
//   },
//   {
//     date: "3/2023",
//     total: 500,
//   },
//   {
//     date: "4/2023",
//     total: 700,
//   },
//   {
//     date: "5/2023",
//     total: 3000,
//   },
//   {
//     date: "6/2023",
//     total: 2000,
//   },
//   {
//     date: "7/2023",
//     total: 1300,
//   },
//   {
//     date: "8/2023",
//     total: 1000,
//   },
//   {
//     date: "9/2023",
//     total: 1300,
//   },
//   {
//     date: "10/2023",
//     total: 7000,
//   },
// ];

const CollectData = (statisticss) => {
  const margin = { top: 30, right: 30, bottom: 60, left: 120 },
    width = 1400 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  const svg = d3
    .select("#collect-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //xScale

  const xScale = d3
    .scaleBand()
    .domain(
      statisticss.map(function (d) {
        return formatTimeIso(d?.createdAt, DMY);
      })
    )
    .range([0, width])
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
  //yScale

  const maxTotal = d3.max(statisticss, function (d) {
    return d?.totalPrice;
  });
  const yScale = d3.scaleLinear().domain([0, maxTotal]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(yScale).ticks(8).tickSize(-width));

  // line

  const line = svg
    .append("path")
    .datum(statisticss)
    .attr(
      "d",
      d3
        .area()
        .x(function (d) {
          return xScale(formatTimeIso(d?.createdAt, DMY));
        })
        .y0(yScale(0))
        .y1(function (d) {
          return yScale(d?.totalPrice);
        })
    )
    .attr("fill", "#cce5df")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 2)
    .attr("transform", "translate(32,0)")
    .attr("opacity", 0.5);

  const pathLength = line.node().getTotalLength();
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
    .data(statisticss)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(formatTimeIso(d?.createdAt, DMY));
    })
    .attr("cy", function (d) {
      return yScale(d?.totalPrice);
    })
    .attr("r", 4)
    .attr("fill", "none")
    .attr("transform", "translate(32,0)")
    .transition()
    .delay(200)
    .duration(2500);

  crircle.transition().attr("fill", "#69b3a2").delay(200).duration(2500);

  //   const colum = svg
  //     .selectAll("myColum")
  //     .data(data)
  //     .enter()
  //     .append("rect")
  //     .attr("x", function (d) {
  //       return xScale(d?.date);
  //     })
  //     .attr("width", xScale.bandwidth())
  //     .attr("y", function (d) {
  //       return 0;
  //     })
  //     .attr("height", function (d) {
  //       return height;
  //     })
  //     .attr("fill", "#69b3a2")
  //     .attr("stroke", "black")
  //     .attr("stroke-width", 1)
  //     .attr("opacity", 0.5);

  //   colum
  //     .transition()
  //     .delay(200)
  //     .duration(2500)
  //     .attr("y", function (d) {
  //       return yScale(d?.total);
  //     })
  //     .attr("height", function (d) {
  //       return height - yScale(d?.total);
  //     });
};

export default CollectData;
