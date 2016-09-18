'use strict';

const React = require('react');

var PeriodSelector = React.createClass({
    getInitialState: function() {
        return {
            selectValue: 'hourly',
            periods: this.props.periods || ['hourly', 'daily', 'raw'] 
        };
    },

    changed: function(e) {
        this.state.selectValue = e.target.value;
        this.props.onChange(e.target.value);
    },

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-10">
                        <div className="col-lg-4">
                            Select period: 
                        </div>
                        <div className="col-lg-6">                                    
                            <select value={this.state.selectValue} onChange={this.changed}>
                                {this.state.periods.map((period, i) => {
                                    return <option value={period}>{period}</option>
                                })};
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <p></p>
                </div>
            </div>
        );
    }
});

module.exports = PeriodSelector;
