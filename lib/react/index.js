'use strict';

let CommandOutput = require('./commandOutput');
let CommandInput = require('./commandInput');
let ServerStatus = require('./serverStatus');
let ClusterStatus = require('./clusterStatus');
let SystemStatus = require('./SystemStatus');

class RedisLive {
    constructor (redisLive) {
        
        let commandOutput = redisLive.commandOutput;
        let commandInput = redisLive.commandInput;

        let serverStatus = redisLive.serverStatus;
        let clusterStatus = redisLive.clusterStatus;
        let systemStatus = redisLive.systemStatus;

        let systemStatusList = redisLive.systemStatusList;


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
                <SystemStatus path={redisLive.path} hosts={redisLive.hosts} systemStatusList={systemStatusList}/>,
                systemStatus
            );
        }
    }
}

module.exports = RedisLive;