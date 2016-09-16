'use strict';

const React = require('react');

var LineChart = require("react-chartjs-2").Line;
let ServerSelector = require('./serverSelector');
let StatSelector = require('./statSelector');

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
        this.getStatus(this.props.hosts[0], this.props.options.types[0]);

        return {
            host: this.props.hosts[0],
            type: this.props.options.types[0],
            data: data
        };
    },

    serverSelectorChanged: function(field) {
        this.setState( {
            host: field,
            type: this.state.type
        });
        this.getStatus(field);
    },

    statSelectorChanged: function(field) {
        this.setState( {
            host: this.state.host,
            type: field
        });
        this.getStatus(null, field);
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
                        label: this.state.host + ' / ' + this.state.type || this.props.options.type,
                        data: data,
                    }]                    
                }
            });
        });
    },

    render: function () {
        var serverSelector = <ServerSelector onChange={this.serverSelectorChanged.bind(this)} hosts={this.props.hosts}/>
        var statSelector = <StatSelector onChange={this.statSelectorChanged.bind(this)} types={this.props.options.types}/>
        return (
            <div>
                {serverSelector}
                {statSelector}
                <LineChart data={this.state.data} options={chartOptions} width="800" height="480"/>
            </div>
        );
    }
});

module.exports = StatsChart;