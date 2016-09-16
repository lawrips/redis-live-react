'use strict';

let CommandOutput = require('./commandOutput');
let CommandInput = require('./commandInput');
let ServerStatus = require('./serverStatus');
let ClusterStatus = require('./clusterStatus');
let SystemStatus = require('./systemStatus');
let StatsChart = require('./statsChart');

const ReactDOM = require('react-dom');
const React = require('react');

class RedisLive {
    constructor (redisLive) {
        
        let commandOutput = redisLive.commandOutput;
        let commandInput = redisLive.commandInput;

        let serverStatus = redisLive.serverStatus;
        let clusterStatus = redisLive.clusterStatus;
        let systemStatus = redisLive.systemStatus.div;

        let statsChart = redisLive.statsChart.div;

        redisLive.path = redisLive.path || '';

        if (commandOutput && commandInput) {
            var Output = ReactDOM.render(
                <CommandOutput />,
                commandOutput
            );

            var Input = ReactDOM.render(
                <CommandInput  path={redisLive.path} commands={redisLive.commands}/>,
                commandInput
            );

            Input.setOutput(Output);
        }

        if (serverStatus) {
            ReactDOM.render(
                <ServerStatus hosts={redisLive.hosts} path={redisLive.path}/>,
                serverStatus
            );
        }

        if (clusterStatus) {
            var Cluster = ReactDOM.render(
                <ClusterStatus path={redisLive.path}/>,
                clusterStatus
            );
            Cluster.initialize();
        }

        if (systemStatus) {
            ReactDOM.render(
                <SystemStatus path={redisLive.path} hosts={redisLive.hosts} options={redisLive.systemStatus.options}/>,
                systemStatus
            );
        }

        if (statsChart) {
            ReactDOM.render(
                <StatsChart path={redisLive.path} options={redisLive.statsChart.options} />,
                statsChart
            );           
        }
    }
}

module.exports = RedisLive;