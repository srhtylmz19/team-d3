import React, {Component, useEffect, useState} from 'react';
import './style.css'
import {select, selectAll} from 'd3-selection'
import {scaleTime, scaleLinear} from 'd3-scale'
import {max, extent} from 'd3-array'
import {axisLeft, axisBottom} from 'd3-axis'
import {timeParse} from 'd3-time-format'
import * as d3 from 'd3'

const initialData = [
    {date: '1-May-12', close: 58.13},
    {date: '30-Apr-12', close: 53.98},
    {date: '27-Apr-12', close: 67.98},
    {date: '26-Apr-12', close: 77.98},
    {date: '25-Apr-12', close: 80.98},
    {date: '24-Apr-12', close: 82.98},
    {date: '23-Apr-12', close: 85.98},
    {date: '22-Apr-12', close: 96.98},
    {date: '21-Apr-12', close: 97.98},
    {date: '20-Apr-12', close: 98.98},
    {date: '19-Apr-12', close: 99.98},
    {date: '18-Apr-12', close: 100.98},
    {date: '17-Apr-12', close: 120.98},
]
const SpotChart = () => {

    const [data, setData] = useState(initialData)


    useEffect(() => {
        console.log('use effect')
        setInitialData()
    })

    const zoom = () => {
        console.log('zoom')
        return
        console.log(d3.select(this))
        //svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    const setInitialData = () => {
        const container = select('.container')

        select('#my-id').remove()


        var parseTime = timeParse("%d-%b-%y");


        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


        var x = scaleTime().range([0, width]);
        var y = scaleLinear().range([height, 0]);

        var area = d3.area()
            .x(d => x(d.date))
            .y0(height)
            .y1(d => y(d.close));

        var valueline = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.close);
            });

        var svg = container.append("svg")
            .attr("id", 'my-id')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        // format the data
        data.forEach(function (d) {
            d.date = parseTime(d.date);
        });

        // scale the range of the data
        x.domain(extent(data, d => d.date));
        y.domain([0, max(data, d => d.close)]);

        // add the area
        svg.append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area);

        // add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(x)
                .tickSize(-height) // arkada ki dikey cizgiler
            )


        // add the Y Axis
        svg.append("g")
            .attr("transform", `translate(0,0)`) //${width} to put in the right side of chart
            .call(axisLeft(y)
                //.tickSize(width)
            )
    }


    const handleUpdateData = () => {
        console.log('handleUpdateData')
        setData(
            [
                {date: '2-May-12', close: 66.13},
                {date: '1-May-12', close: 58.13},
                {date: '30-Apr-12', close: 53.98},
                {date: '27-Apr-12', close: 67.98},
                {date: '26-Apr-12', close: 77.98},
                {date: '25-Apr-12', close: 80.98},
                {date: '24-Apr-12', close: 82.98},
                {date: '23-Apr-12', close: 85.98},
                {date: '22-Apr-12', close: 96.98},
                {date: '21-Apr-12', close: 97.98},
                {date: '20-Apr-12', close: 98.98},
                {date: '19-Apr-12', close: 99.98},
                {date: '18-Apr-12', close: 100.98},
                {date: '17-Apr-12', close: 120.98},
            ]
        )
    }
    return (
        <div className="container">
            <p onClick={handleUpdateData}>example chart</p>
        </div>
    );

}

export default SpotChart;