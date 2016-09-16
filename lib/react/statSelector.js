'use strict';

const React = require('react');

var StatSelector = React.createClass({
    getInitialState: function() {
        return {
            selectValue: this.props.types[0] 
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
                            Select stat: 
                        </div>
                        <div className="col-lg-6">                
                            <select value={this.state.selectValue} onChange={this.changed}>
                                {this.props.types.map((type, i) => {
                                    return <option id={i} name="{type}">{type}</option>
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

module.exports = StatSelector;
