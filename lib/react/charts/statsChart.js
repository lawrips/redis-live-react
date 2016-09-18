'use strict';

const React = require('react');

var LineChart = require("react-chartjs-2").Line;
let ServerSelector = require('../server/serverSelector');
let StatSelector = require('./statSelector');
let PeriodSelector = require('./periodSelector');

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
        this.getStatus(this.props.hosts[0], this.props.options.types[0], 'hourly');

        return {
            host: this.props.hosts[0],
            period: 'hourly',
            type: this.props.options.types[0],
            data: data
        };
    },

    serverSelectorChanged: function(field) {
        this.setState( {
            host: field,
            type: this.state.type,
            period: this.state.period
        });
        this.getStatus(field, null, null);
    },

    statSelectorChanged: function(field) {
        this.setState( {
            period: this.state.period,
            host: this.state.host,
            type: field
        });
        this.getStatus(null, field, null);
    },

    periodSelectorChanged: function(field) {
        this.setState( {
            host: this.state.host,
            type: this.state.type,
            period: field
        });
        this.getStatus(null, null, field);
    },

    getStatus: function(host, type, period) {
        var options = {
            url: this.props.path + '/stats',
            dataType: 'json', 
            type: 'POST',
            data: { host: host || this.state.host, 'type' : type || this.state.type, 'period' : period || this.state.period},
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
        var serverSelector = <ServerSelector onChange={this.serverSelectorChanged} hosts={this.props.hosts}/>
        var statSelector = <StatSelector onChange={this.statSelectorChanged} types={this.props.options.types}/>
        var periodSelector = <PeriodSelector onChange={this.periodSelectorChanged} periods={['hourly','daily','raw']}/>
        return (
            <div>
                {serverSelector}
                {statSelector}
                {periodSelector}
                <LineChart data={this.state.data} options={chartOptions} width={this.props.width || "800"} height={this.props.height || "480"}/>
            </div>
        );
    }
});

module.exports = StatsChart;