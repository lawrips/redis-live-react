'use strict';

const React = require('react');

let LineChart = require("react-chartjs-2").Line;
let ServerSelector = require('../server/serverSelector');
let StatSelector = require('./statSelector');
let PeriodSelector = require('./periodSelector');

let data = {
        labels: [],
        datasets: [{
            data: [],
            label: ''
        }]};


let chartOptions = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'hour'
                }
            }]
        }
    };

var StatsChart = React.createClass({
    getInitialState: function() {                    
        this.getStatus(this.props.hosts[0], this.props.options.types[0], 'hourly');

        return {
            host: this.props.hosts[0],
            period: 'hourly',
            type: this.props.options.types[0],
            data: data,
            chartOptions: chartOptions
        };
    },

    serverSelectorChanged: function(field) {
        this.getStatus(field, this.state.type, this.state.period);
    },

    statSelectorChanged: function(field) {
        this.getStatus(this.state.host, field, this.state.period);
    },

    periodSelectorChanged: function(field) {
        this.getStatus(this.state.host, this.state.type, field);
    },

    getStatus: function(host, type, period) {
        var options = {
            url: this.props.path + '/stats',
            dataType: 'json', 
            type: 'POST',
            data: { host: host || this.state.host, 'type' : type || this.state.type, 'period' : period || this.state.period},
        }

        $.ajax(options).always((result) => {
            // e.g. becomes ["2016-09-22T00:00:00.000","2016-09-23T00:00:00.000","2016-09-24T00:00:00.000"]
            let labels = result.map((item) => Object.keys(item)[0]);
            // e.g. becomes ["10","11","12"]
            let data = result.map((item) => item[Object.keys(item)[0]]);

            if (period == 'daily') {
                labels = labels.map((i) => i.slice(0,10));
                chartOptions.scales.xAxes[0].time.unit = 'day';
            }
            else {
                chartOptions.scales.xAxes[0].time.unit = 'hour';                
            }
            
            this.setState({
                data: {
                    labels: labels,
                    datasets: [{
                        label: this.state.host + ' / ' + this.state.type || this.props.options.type,
                        data: data,
                    }]                    
                },
                chartOptions: chartOptions,
                host: host,
                type: type,
                period: period
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
                <LineChart data={this.state.data} options={this.state.chartOptions} width={this.props.width || "800"} height={this.props.height || "480"} redraw/>
            </div>
        );
    }
});

module.exports = StatsChart;