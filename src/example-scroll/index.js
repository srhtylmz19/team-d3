// zoom with no gesture 


import React from 'react';
import './style.css'
import {select} from 'd3-selection'
import {scaleTime, scaleLinear} from 'd3-scale'
import {extent} from 'd3-array'
import {zoom} from 'd3-zoom'
import {
    axisBottom,
    axisLeft
} from 'd3-axis'
import * as d3 from 'd3'
import {timeFormat} from "d3";


const margin = {
    top: 70,
    right: 70,
    bottom: 70,
    left: 70
};
const width = window.innerWidth - margin.left - margin.right;
const height = window.innerHeight / 1.2 - margin.top - margin.bottom;
const data = [
    {
        date: 1595600571000,
        value: '113.00',
    },

    {
        date: 1595600575000,
        value: '123.50',
    },

    {
        date: 1595600579000,
        value: '125.00',
    },
    {
        date: 1595600590000,
        value: '121.00',
    },
    {
        date: 1595600595000,
        value: '163.40',
    },


]


class ScrollAbleChart extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef()
        this.state = {}
    }

    componentDidMount() {

        const xValueToShow = scaleTime()
            .domain(extent(data, function (d) {
                return d.date;
            }))
            .range([0, width])

        const x = scaleTime()
            .domain(extent(data, function (d) {
                return d.date;
            }))
            .range([0, width / 1.5])


        const xCopy = x.copy();
        const xValueToShowCopy = xValueToShow.copy();

        const y = scaleLinear()
            .domain(extent(data, function (d) {
                return d.value;
            }))
            .range([height, 0])



        const yCopy = y.copy();

        const lineSecond = d3.area()
            .x(d => x(d.date))
            .y0(height)
            .y1(d => y(d.value))


        const zoomSecond = zoom().on("zoom", function () {
            if (d3.event.type === "zoom" || d3.event.type === "wheel") return zoomEvent()
        })


        const svg = select(this.containerRef.current).append("svg:svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(zoomSecond)

        svg.append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "plot");


        const make_x_axis = () => {
            return axisBottom(xValueToShow).ticks(15);
        };
        const make_y_axis = () => {
            return axisLeft(y).ticks(15);
        };


        //const xAxis = axisBottom(x).ticks(15);
        const xValueAxis = axisBottom(xValueToShow).ticks(15);

        // tarih = alt
        svg.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xValueAxis.tickFormat(function (d) {
                return timeFormat("%H:%M:%S")(d)
            }));

        const yAxis = axisLeft(y).ticks(15);

        // deger = sol
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis.tickFormat(function (d) {
                if (d === 0) return 'must stop'; // No label for '0'
                return d;
            }));


        svg.append("g")
            .attr("class", "x grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat(""));

        svg.append("g")
            .attr("class", "y grid")
            .call(make_y_axis()
                .tickSize(-width, 0, 0)
                .tickFormat(""));


        const clip = svg.append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height);

        const chartBody = svg.append("g")
            .attr("clip-path", "url(#clip)");


        chartBody.append("svg:path")
            .datum(data)
            .attr("class", "line")
            .attr("d", lineSecond);

        const zoomEvent = () => {
            const t = d3.event.transform;

            console.log(t.rescaleY(yCopy).domain()[0])
            if (t.rescaleY(yCopy).domain()[0] <= 0) return




            x.domain(t.rescaleX(xCopy).domain());
            xValueToShow.domain(t.rescaleX(xValueToShowCopy).domain())
            y.domain(t.rescaleY(yCopy).domain());


            svg.select(".x.axis").call(xValueAxis);
            svg.select(".y.axis").call(yAxis);
            svg.select(".x.grid")
                .call(make_x_axis()
                    .tickSize(-height, 0, 0)
                    .tickFormat(""));
            svg.select(".y.grid")
                .call(make_y_axis()
                    .tickSize(-width, 0, 0)
                    .tickFormat(""));


            svg.select(".line")
                .attr("class", "line")
                .attr("d", lineSecond);

        }


    }


    render() {
        return (
            <div id="chart" ref={this.containerRef} className={'container'}>
            </div>
        );
    }

}

export default ScrollAbleChart;
