'use strict';


var SystemStatus = React.createClass({
    getInitialState: function() {
        let status = [];

        this.props.hosts.forEach((host) => {
            this.getStatus(host, (err, result) => {
                status.push([host].concat(this._renderStatus(result)));
                this.setState({
                    status: status,
                });
            });
        });

        return {
            systemStatusList: this.props.systemStatusList || ['used_memory'],
            status : status
        }
    },

    getStatus: function(host, callback) {
        var options = {
            url: this.props.path + '/info',
            dataType: 'json', 
            type: 'POST',
            data: { host: host },
        }

        this.serverRequest = $.ajax(options).always((result) => {
            callback(null, result.responseText);
        });
    },

    render: function() {
        if (this.state.status.length > 0) {
            var counter =0;
            return (
                <div>
                    <table>
                        <thead>
                            <tr><td>Server</td>
                                { this.state.status[0].map(function(col, j) {
                                        if (counter++ % 2 == 1) {
                                            return <td key={j}>{col}</td>;
                                        }
                                    }
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.status.map((row, i) => {
                                counter = 0;
                                return (
                                    <tr key={i}>
                                        {row.map(function(col, j) {
                                            if (counter++ % 2 == 0) {                                            
                                                return <td key={j}>{col}</td>;
                                            }
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div>Results will be displayed here</div>
                </div>
            );
        }
    },

    _renderStatus : function(status) {
        let lines = status.split('\n');
        let table = [];
        lines.forEach((line) => {
            if (line) {
                let pair = line.split(':');
                if (this.state.systemStatusList.indexOf(pair[0]) > -1) {
                    table.push(pair[0]);
                    table.push(pair[1]);
                }
            }
        });
        
        return table;

    }

});


module.exports = SystemStatus;
