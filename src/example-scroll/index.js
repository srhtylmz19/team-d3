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


const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 45
};

const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;
const data = [
    {
        "date": 1357714800000,
        "value": "5.2"
    }, {
        "date": 1357715400000,
        "value": "5.2"
    }, {
        "date": 1357716000000,
        "value": "5.2"
    }, {
        "date": 1357716600000,
        "value": "5.1"
    }, {
        "date": 1357717200000,
        "value": "5.5"
    }, {
        "date": 1357717800000,
        "value": "5.6"
    }, {
        "date": 1357718400000,
        "value": "5.6"
    }, {
        "date": 1357719000000,
        "value": "6"
    }, {
        "date": 1357719600000,
        "value": "5.1"
    }, {
        "date": 1357720200000,
        "value": "5.3"
    }, {
        "date": 1357720800000,
        "value": "5.4"
    }]


class ScrollAbleChart extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef()
        this.state = {}
    }

    componentDidMount() {
        var x = scaleTime()
            .domain(extent(data, function (d) {
                return d.date;
            }))
            .range([0, width]);

        var y = scaleLinear()
            .domain(extent(data, function (d) {
                return d.value;
            }))
            .range([height, 0]);

        var lineSecond = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));


        var zoomSecond = d3.zoom().on("zoom", function () {
            if (d3.event.type === "zoom") return zoomEvent()

        })

        const zoomEvent = () => {
            // not working
            svg.select(".x.axis").call(xAxis);
            svg.select(".y.axis").call(yAxis);

            svg.select(".x.grid").call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );

            svg.select(".y.grid").call(make_y_axis()
                .tickSize(-width, 0, 0)
                .tickFormat(""));


            svg.select(".line").attr("class", "line")
                .attr("d", lineSecond);
        }


        const svg = select('#chart').append("svg:svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(zoomSecond);

        svg.append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "plot");


        var make_x_axis =() => { return axisBottom(y).ticks(5);};
        var make_y_axis =() => { return axisLeft(y).ticks(5);};


        var xAxis = axisBottom(x).ticks(5);

        svg.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis);

        var yAxis = axisLeft(y)
            .ticks(5);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

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


        var clip = svg.append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height);

        var chartBody = svg.append("g")
            .attr("clip-path", "url(#clip)");


        chartBody.append("svg:path")
            .datum(data)
            .attr("class", "line")
            .attr("d", lineSecond);

    }


    render() {
        return (
            <div id="chart" ref={this.containerRef} className={'container'}>
            </div>
        );
    }

}

export default ScrollAbleChart;