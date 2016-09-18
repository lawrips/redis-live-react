'use strict';

const React = require('react');
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

let StatSelector = require('./statSelector');
let PeriodSelector = require('./periodSelector');

var SparkChart = React.createClass({
    getInitialState: function() {                    
        this.getStatus(this.props.options.types[0], 'hourly');
        let data = {};
        this.props.hosts.forEach((host) => {
            data[host] = [0];
        });

        return {
            period: 'hourly',
            type: this.props.options.types[0],
            data: data
        };
    },

    statSelectorChanged: function(field) {
        this.setState( {
            period: this.state.period,
            type: field
        });
        this.getStatus(field, null);
    },

    periodSelectorChanged: function(field) {
        this.setState( {
            type: this.state.type,
            period: field
        });
        this.getStatus(null, field);
    },

    getStatus: function(type, period) {
        this.props.hosts.forEach((host) => {
            var options = {
                url: this.props.path + '/stats',
                dataType: 'json', 
                type: 'POST',
                data: { host: host, 'type' : type || this.state.type, 'period' : period || this.state.period }
            }

            $.ajax(options).always((result) => {
                result = result.map((item) => item[Object.keys(item)[0]]);

                let data = this.state.data;
                data[host] = result;
                this.setState({
                    data: data
                });
            });
        });
    },

    render: function () {
        var statSelector = <StatSelector onChange={this.statSelectorChanged} types={this.props.options.types}/>
        var periodSelector = <PeriodSelector onChange={this.periodSelectorChanged} periods={['hourly','daily']}/>
        return (
            <div>
                {statSelector}
                {periodSelector}
                {this.props.hosts.map((host, j) => {
                    return (
                        <div className="col-lg-4">
                            {host}
                            <Sparklines id={j} data={this.state.data[host]} limit={6}>
                                <SparklinesLine color="blue"/>
                                <SparklinesSpots />
                            </Sparklines>
                        </div>
                    )
                })}
            </div>
        );
    }
});

module.exports = SparkChart;