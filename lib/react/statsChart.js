'use strict';

const React = require('react');

var LineChart = require("react-chartjs-2").Line;

let data = {
        labels: [],
        datasets: [{
            data: [],
            label: ''
        }]};


let chartOptions ={
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'hour'
                }
            }]
        }
    }

var StatsChart = React.createClass({
    getInitialState: function() {                    
        this.getStatus(this.props.options.host, this.props.options.type);

        return {
            host: this.props.options.host,
            type: this.props.options.type,
            data: data
        };
    },

    setHost: function(host) {
        this.getStatus(host);
    },

    setType: function(type) {
        this.getStatus(null, type);
    },

    getStatus: function(host, type) {
        var options = {
            url: this.props.path + '/stats',
            dataType: 'json', 
            type: 'POST',
            data: { host: host || this.state.host, 'type' : type || this.state.type},
        }

        $.ajax(options).always((result) => {
            let labels = result.map((item) => Object.keys(item)[0]);
            let data = result.map((item) => item[Object.keys(item)[0]]);
            
            this.setState({
                data: {
                    labels: labels,
                    datasets: [{
                        label: this.props.options.type,
                        data: data,
                    }]                    
                }
            });
        });
    },

    render: function () {
        return <LineChart data={this.state.data} options={chartOptions} width="800" height="480"/>
    }
});

module.exports = StatsChart;