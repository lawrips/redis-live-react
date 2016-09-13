module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CommandOutput = __webpack_require__(1);
	var CommandInput = __webpack_require__(2);
	var ServerStatus = __webpack_require__(5);
	var ClusterStatus = __webpack_require__(7);
	var SystemStatus = __webpack_require__(8);

	var RedisLive = function RedisLive(redisLive) {
	    _classCallCheck(this, RedisLive);

	    var commandOutput = redisLive.commandOutput;
	    var commandInput = redisLive.commandInput;

	    var serverStatus = redisLive.serverStatus;
	    var clusterStatus = redisLive.clusterStatus;
	    var systemStatus = redisLive.systemStatus;

	    var systemStatusList = redisLive.systemStatusList;

	    redisLive.path = redisLive.path || '';

	    if (commandOutput && commandInput) {
	        var Output = ReactDOM.render(React.createElement(CommandOutput, null), commandOutput);

	        var Input = ReactDOM.render(React.createElement(CommandInput, { path: redisLive.path, commands: redisLive.commands }), commandInput);

	        Input.setOutput(Output);
	    }

	    if (serverStatus) {
	        ReactDOM.render(React.createElement(ServerStatus, { hosts: redisLive.hosts, path: redisLive.path }), serverStatus);
	    }

	    if (clusterStatus) {
	        var Cluster = ReactDOM.render(React.createElement(ClusterStatus, { path: redisLive.path }), clusterStatus);
	        Cluster.initialize();
	    }

	    if (systemStatus) {
	        ReactDOM.render(React.createElement(SystemStatus, { path: redisLive.path, hosts: redisLive.hosts, systemStatusList: systemStatusList }), systemStatus);
	    }
	};

	module.exports = RedisLive;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var resultsStyle = {
	    "height": "200px",
	    "fontFamily": "monospace"
	};

	var CommandOutput = React.createClass({
	    displayName: "CommandOutput",

	    getInitialState: function getInitialState() {
	        return {
	            text: ''
	        };
	    },

	    setText: function setText(text) {
	        this.setState({
	            text: text
	        });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement("pre", { style: resultsStyle, dangerouslySetInnerHTML: { __html: this.state.text } })
	        );
	    }
	});

	module.exports = CommandOutput;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* eslint-disable react/react-in-jsx-scope */
	var Commands = __webpack_require__(3);

	// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
	var commands;

	function escapeRegexCharacters(str) {
	  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function getSuggestions(value) {
	  var escapedValue = escapeRegexCharacters(value.trim());

	  if (escapedValue === '') {
	    return [];
	  }

	  var regex = new RegExp('^' + escapedValue, 'i');

	  return commands.filter(function (language) {
	    return regex.test(language.name);
	  });
	}

	function getSuggestionValue(suggestion) {
	  return suggestion.name;
	}

	function renderSuggestion(suggestion) {
	  return React.createElement(
	    'span',
	    null,
	    suggestion.name
	  );
	}

	var CommandInput = function (_React$Component) {
	  _inherits(CommandInput, _React$Component);

	  // eslint-disable-line no-undef
	  function CommandInput() {
	    _classCallCheck(this, CommandInput);

	    var _this = _possibleConstructorReturn(this, (CommandInput.__proto__ || Object.getPrototypeOf(CommandInput)).call(this));

	    _this.onChange = function (event, _ref) {
	      var newValue = _ref.newValue;

	      _this.setState({
	        value: newValue,
	        text: event.target.value
	      });

	      commands.forEach(function (command) {
	        if (command.name == newValue) {
	          _this.setState({
	            summary: command.summary,
	            complexity: command.complexity
	          });
	        }
	      });
	    };

	    _this.onSuggestionsFetchRequested = function (_ref2) {
	      var value = _ref2.value;

	      _this.setState({
	        suggestions: getSuggestions(value)
	      });
	    };

	    _this.onSuggestionsClearRequested = function () {
	      _this.setState({
	        suggestions: []
	      });
	    };

	    _this.getText = function () {
	      return _this.state.text;
	    };

	    _this.setOutput = function (output) {
	      _this.setState({
	        output: output
	      });
	    };

	    _this.onButtonClick = function (evt) {
	      var options = {
	        url: _this.props.path + '/command',
	        dataType: 'json',
	        type: 'POST',
	        data: { command: _this.getText() }
	      };

	      _this.serverRequest = $.ajax(options).always(function (result) {
	        if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
	          _this.state.output.setText(result.responseText);
	        } else {
	          _this.state.output.setText(result.replace(/\n/g, '<br />'));
	        }
	      });
	    };

	    _this.state = {
	      value: '',
	      suggestions: getSuggestions('')
	    };
	    return _this;
	  }

	  _createClass(CommandInput, [{
	    key: 'render',
	    value: function render() {
	      commands = commands || this.props.commands || new Commands().get();
	      //commands = this.props.commands;
	      var _state = this.state;
	      var value = _state.value;
	      var suggestions = _state.suggestions;

	      var inputProps = {
	        placeholder: 'e.g. SET hello world',
	        value: value,
	        onChange: this.onChange
	      };

	      var css = {
	        "display": "inline-block",
	        "verticalAlign": "middle"
	      };

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'autosuggest' },
	            React.createElement(Autosuggest // eslint-disable-line react/jsx-no-undef
	            , { suggestions: suggestions,
	              onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
	              onSuggestionsClearRequested: this.onSuggestionsClearRequested,
	              getSuggestionValue: getSuggestionValue,
	              renderSuggestion: renderSuggestion,
	              inputProps: inputProps
	            })
	          ),
	          React.createElement(
	            'label',
	            { id: 'summaryLabel', className: 'autosuggest-summary' },
	            this.state.summary,
	            ' ',
	            this.state.complexity ? ' - ' + this.state.complexity : ''
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'button',
	            { className: 'btn btn-primary', onClick: this.onButtonClick },
	            'Run Command'
	          )
	        )
	      );
	    }
	  }]);

	  return CommandInput;
	}(React.Component);

	module.exports = CommandInput;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Commands = function () {
	    function Commands(json) {
	        _classCallCheck(this, Commands);

	        this.json = json || __webpack_require__(4);
	    }

	    _createClass(Commands, [{
	        key: 'get',
	        value: function get() {
	            var commands = [];
	            for (var key in this.json) {
	                var command = key + ' ';
	                for (var argument in this.json[key].arguments) {
	                    if (this.json[key].arguments[argument].optional) {
	                        // optional
	                        command = command + '[' + this.json[key].arguments[argument].name + '] ';
	                    } else {
	                        // required
	                        command = command + this.json[key].arguments[argument].name + ' ';
	                    }
	                }
	                commands.push({ "name": command.trim(), summary: this.json[key].summary, complexity: this.json[key].complexity });
	            }
	            return commands;
	        }
	    }]);

	    return Commands;
	}();

	module.exports = Commands;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"APPEND": {
			"summary": "Append a value to a key",
			"complexity": "O(1). The amortized time complexity is O(1) assuming the appended value is small and the already present value is of any size, since the dynamic string library used by Redis will double the free space available on every reallocation.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "string"
		},
		"AUTH": {
			"summary": "Authenticate to the server",
			"arguments": [
				{
					"name": "password",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "connection"
		},
		"BGREWRITEAOF": {
			"summary": "Asynchronously rewrite the append-only file",
			"since": "1.0.0",
			"group": "server"
		},
		"BGSAVE": {
			"summary": "Asynchronously save the dataset to disk",
			"since": "1.0.0",
			"group": "server"
		},
		"BITCOUNT": {
			"summary": "Count set bits in a string",
			"complexity": "O(N)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": [
						"start",
						"end"
					],
					"type": [
						"integer",
						"integer"
					],
					"optional": true
				}
			],
			"since": "2.6.0",
			"group": "string"
		},
		"BITFIELD": {
			"summary": "Perform arbitrary bitfield integer operations on strings",
			"complexity": "O(1) for each subcommand specified",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"command": "GET",
					"name": [
						"type",
						"offset"
					],
					"type": [
						"type",
						"integer"
					],
					"optional": true
				},
				{
					"command": "SET",
					"name": [
						"type",
						"offset",
						"value"
					],
					"type": [
						"type",
						"integer",
						"integer"
					],
					"optional": true
				},
				{
					"command": "INCRBY",
					"name": [
						"type",
						"offset",
						"increment"
					],
					"type": [
						"type",
						"integer",
						"integer"
					],
					"optional": true
				},
				{
					"command": "OVERFLOW",
					"type": "enum",
					"enum": [
						"WRAP",
						"SAT",
						"FAIL"
					],
					"optional": true
				}
			],
			"since": "3.2.0",
			"group": "string"
		},
		"BITOP": {
			"summary": "Perform bitwise operations between strings",
			"complexity": "O(N)",
			"arguments": [
				{
					"name": "operation",
					"type": "string"
				},
				{
					"name": "destkey",
					"type": "key"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "2.6.0",
			"group": "string"
		},
		"BITPOS": {
			"summary": "Find first bit set or clear in a string",
			"complexity": "O(N)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "bit",
					"type": "integer"
				},
				{
					"name": "start",
					"type": "integer",
					"optional": true
				},
				{
					"name": "end",
					"type": "integer",
					"optional": true
				}
			],
			"since": "2.8.7",
			"group": "string"
		},
		"BLPOP": {
			"summary": "Remove and get the first element in a list, or block until one is available",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				},
				{
					"name": "timeout",
					"type": "integer"
				}
			],
			"since": "2.0.0",
			"group": "list"
		},
		"BRPOP": {
			"summary": "Remove and get the last element in a list, or block until one is available",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				},
				{
					"name": "timeout",
					"type": "integer"
				}
			],
			"since": "2.0.0",
			"group": "list"
		},
		"BRPOPLPUSH": {
			"summary": "Pop a value from a list, push it to another list and return it; or block until one is available",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "source",
					"type": "key"
				},
				{
					"name": "destination",
					"type": "key"
				},
				{
					"name": "timeout",
					"type": "integer"
				}
			],
			"since": "2.2.0",
			"group": "list"
		},
		"CLIENT KILL": {
			"summary": "Kill the connection of a client",
			"complexity": "O(N) where N is the number of client connections",
			"arguments": [
				{
					"name": "ip:port",
					"type": "string",
					"optional": true
				},
				{
					"command": "ID",
					"name": "client-id",
					"type": "integer",
					"optional": true
				},
				{
					"command": "TYPE",
					"type": "enum",
					"enum": [
						"normal",
						"master",
						"slave",
						"pubsub"
					],
					"optional": true
				},
				{
					"command": "ADDR",
					"name": "ip:port",
					"type": "string",
					"optional": true
				},
				{
					"command": "SKIPME",
					"name": "yes/no",
					"type": "string",
					"optional": true
				}
			],
			"since": "2.4.0",
			"group": "server"
		},
		"CLIENT LIST": {
			"summary": "Get the list of client connections",
			"complexity": "O(N) where N is the number of client connections",
			"since": "2.4.0",
			"group": "server"
		},
		"CLIENT GETNAME": {
			"summary": "Get the current connection name",
			"complexity": "O(1)",
			"since": "2.6.9",
			"group": "server"
		},
		"CLIENT PAUSE": {
			"summary": "Stop processing commands from clients for some time",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "timeout",
					"type": "integer"
				}
			],
			"since": "2.9.50",
			"group": "server"
		},
		"CLIENT REPLY": {
			"summary": "Instruct the server whether to reply to commands",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "reply-mode",
					"type": "enum",
					"enum": [
						"ON",
						"OFF",
						"SKIP"
					]
				}
			],
			"since": "3.2",
			"group": "server"
		},
		"CLIENT SETNAME": {
			"summary": "Set the current connection name",
			"complexity": "O(1)",
			"since": "2.6.9",
			"arguments": [
				{
					"name": "connection-name",
					"type": "string"
				}
			],
			"group": "server"
		},
		"CLUSTER ADDSLOTS": {
			"summary": "Assign new hash slots to receiving node",
			"complexity": "O(N) where N is the total number of hash slot arguments",
			"arguments": [
				{
					"name": "slot",
					"type": "integer",
					"multiple": true
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER COUNT-FAILURE-REPORTS": {
			"summary": "Return the number of failure reports active for a given node",
			"complexity": "O(N) where N is the number of failure reports",
			"arguments": [
				{
					"name": "node-id",
					"type": "string"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER COUNTKEYSINSLOT": {
			"summary": "Return the number of local keys in the specified hash slot",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "slot",
					"type": "integer"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER DELSLOTS": {
			"summary": "Set hash slots as unbound in receiving node",
			"complexity": "O(N) where N is the total number of hash slot arguments",
			"arguments": [
				{
					"name": "slot",
					"type": "integer",
					"multiple": true
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER FAILOVER": {
			"summary": "Forces a slave to perform a manual failover of its master.",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "options",
					"type": "enum",
					"enum": [
						"FORCE",
						"TAKEOVER"
					],
					"optional": true
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER FORGET": {
			"summary": "Remove a node from the nodes table",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "node-id",
					"type": "string"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER GETKEYSINSLOT": {
			"summary": "Return local key names in the specified hash slot",
			"complexity": "O(log(N)) where N is the number of requested keys",
			"arguments": [
				{
					"name": "slot",
					"type": "integer"
				},
				{
					"name": "count",
					"type": "integer"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER INFO": {
			"summary": "Provides info about Redis Cluster node state",
			"complexity": "O(1)",
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER KEYSLOT": {
			"summary": "Returns the hash slot of the specified key",
			"complexity": "O(N) where N is the number of bytes in the key",
			"arguments": [
				{
					"name": "key",
					"type": "string"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER MEET": {
			"summary": "Force a node cluster to handshake with another node",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "ip",
					"type": "string"
				},
				{
					"name": "port",
					"type": "integer"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER NODES": {
			"summary": "Get Cluster config for the node",
			"complexity": "O(N) where N is the total number of Cluster nodes",
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER REPLICATE": {
			"summary": "Reconfigure a node as a slave of the specified master node",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "node-id",
					"type": "string"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER RESET": {
			"summary": "Reset a Redis Cluster node",
			"complexity": "O(N) where N is the number of known nodes. The command may execute a FLUSHALL as a side effect.",
			"arguments": [
				{
					"name": "reset-type",
					"type": "enum",
					"enum": [
						"HARD",
						"SOFT"
					],
					"optional": true
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER SAVECONFIG": {
			"summary": "Forces the node to save cluster state on disk",
			"complexity": "O(1)",
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER SET-CONFIG-EPOCH": {
			"summary": "Set the configuration epoch in a new node",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "config-epoch",
					"type": "integer"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER SETSLOT": {
			"summary": "Bind a hash slot to a specific node",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "slot",
					"type": "integer"
				},
				{
					"name": "subcommand",
					"type": "enum",
					"enum": [
						"IMPORTING",
						"MIGRATING",
						"STABLE",
						"NODE"
					]
				},
				{
					"name": "node-id",
					"type": "string",
					"optional": true
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER SLAVES": {
			"summary": "List slave nodes of the specified master node",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "node-id",
					"type": "string"
				}
			],
			"since": "3.0.0",
			"group": "cluster"
		},
		"CLUSTER SLOTS": {
			"summary": "Get array of Cluster slot to node mappings",
			"complexity": "O(N) where N is the total number of Cluster nodes",
			"since": "3.0.0",
			"group": "cluster"
		},
		"COMMAND": {
			"summary": "Get array of Redis command details",
			"complexity": "O(N) where N is the total number of Redis commands",
			"since": "2.8.13",
			"group": "server"
		},
		"COMMAND COUNT": {
			"summary": "Get total number of Redis commands",
			"complexity": "O(1)",
			"since": "2.8.13",
			"group": "server"
		},
		"COMMAND GETKEYS": {
			"summary": "Extract keys given a full Redis command",
			"complexity": "O(N) where N is the number of arguments to the command",
			"since": "2.8.13",
			"group": "server"
		},
		"COMMAND INFO": {
			"summary": "Get array of specific Redis command details",
			"complexity": "O(N) when N is number of commands to look up",
			"since": "2.8.13",
			"arguments": [
				{
					"name": "command-name",
					"type": "string",
					"multiple": true
				}
			],
			"group": "server"
		},
		"CONFIG GET": {
			"summary": "Get the value of a configuration parameter",
			"arguments": [
				{
					"name": "parameter",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "server"
		},
		"CONFIG REWRITE": {
			"summary": "Rewrite the configuration file with the in memory configuration",
			"since": "2.8.0",
			"group": "server"
		},
		"CONFIG SET": {
			"summary": "Set a configuration parameter to the given value",
			"arguments": [
				{
					"name": "parameter",
					"type": "string"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "server"
		},
		"CONFIG RESETSTAT": {
			"summary": "Reset the stats returned by INFO",
			"complexity": "O(1)",
			"since": "2.0.0",
			"group": "server"
		},
		"DBSIZE": {
			"summary": "Return the number of keys in the selected database",
			"since": "1.0.0",
			"group": "server"
		},
		"DEBUG OBJECT": {
			"summary": "Get debugging information about a key",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "server"
		},
		"DEBUG SEGFAULT": {
			"summary": "Make the server crash",
			"since": "1.0.0",
			"group": "server"
		},
		"DECR": {
			"summary": "Decrement the integer value of a key by one",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"DECRBY": {
			"summary": "Decrement the integer value of a key by the given number",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "decrement",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"DEL": {
			"summary": "Delete a key",
			"complexity": "O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"DISCARD": {
			"summary": "Discard all commands issued after MULTI",
			"since": "2.0.0",
			"group": "transactions"
		},
		"DUMP": {
			"summary": "Return a serialized version of the value stored at the specified key.",
			"complexity": "O(1) to access the key and additional O(N*M) to serialized it, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.6.0",
			"group": "generic"
		},
		"ECHO": {
			"summary": "Echo the given string",
			"arguments": [
				{
					"name": "message",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "connection"
		},
		"EVAL": {
			"summary": "Execute a Lua script server side",
			"complexity": "Depends on the script that is executed.",
			"arguments": [
				{
					"name": "script",
					"type": "string"
				},
				{
					"name": "numkeys",
					"type": "integer"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				},
				{
					"name": "arg",
					"type": "string",
					"multiple": true
				}
			],
			"since": "2.6.0",
			"group": "scripting"
		},
		"EVALSHA": {
			"summary": "Execute a Lua script server side",
			"complexity": "Depends on the script that is executed.",
			"arguments": [
				{
					"name": "sha1",
					"type": "string"
				},
				{
					"name": "numkeys",
					"type": "integer"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				},
				{
					"name": "arg",
					"type": "string",
					"multiple": true
				}
			],
			"since": "2.6.0",
			"group": "scripting"
		},
		"EXEC": {
			"summary": "Execute all commands issued after MULTI",
			"since": "1.2.0",
			"group": "transactions"
		},
		"EXISTS": {
			"summary": "Determine if a key exists",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"EXPIRE": {
			"summary": "Set a key's time to live in seconds",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "seconds",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"EXPIREAT": {
			"summary": "Set the expiration for a key as a UNIX timestamp",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "timestamp",
					"type": "posix time"
				}
			],
			"since": "1.2.0",
			"group": "generic"
		},
		"FLUSHALL": {
			"summary": "Remove all keys from all databases",
			"since": "1.0.0",
			"group": "server"
		},
		"FLUSHDB": {
			"summary": "Remove all keys from the current database",
			"since": "1.0.0",
			"group": "server"
		},
		"GEOADD": {
			"summary": "Add one or more geospatial items in the geospatial index represented using a sorted set",
			"complexity": "O(log(N)) for each item added, where N is the number of elements in the sorted set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": [
						"longitude",
						"latitude",
						"member"
					],
					"type": [
						"double",
						"double",
						"string"
					],
					"multiple": true
				}
			],
			"since": "3.2.0",
			"group": "geo"
		},
		"GEOHASH": {
			"summary": "Returns members of a geospatial index as standard geohash strings",
			"complexity": "O(log(N)) for each member requested, where N is the number of elements in the sorted set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string",
					"multiple": true
				}
			],
			"since": "3.2.0",
			"group": "geo"
		},
		"GEOPOS": {
			"summary": "Returns longitude and latitude of members of a geospatial index",
			"complexity": "O(log(N)) for each member requested, where N is the number of elements in the sorted set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string",
					"multiple": true
				}
			],
			"since": "3.2.0",
			"group": "geo"
		},
		"GEODIST": {
			"summary": "Returns the distance between two members of a geospatial index",
			"complexity": "O(log(N))",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member1",
					"type": "string"
				},
				{
					"name": "member2",
					"type": "string"
				},
				{
					"name": "unit",
					"type": "string",
					"optional": true
				}
			],
			"since": "3.2.0",
			"group": "geo"
		},
		"GEORADIUS": {
			"summary": "Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point",
			"complexity": "O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "longitude",
					"type": "double"
				},
				{
					"name": "latitude",
					"type": "double"
				},
				{
					"name": "radius",
					"type": "double"
				},
				{
					"name": "unit",
					"type": "enum",
					"enum": [
						"m",
						"km",
						"ft",
						"mi"
					]
				},
				{
					"name": "withcoord",
					"type": "enum",
					"enum": [
						"WITHCOORD"
					],
					"optional": true
				},
				{
					"name": "withdist",
					"type": "enum",
					"enum": [
						"WITHDIST"
					],
					"optional": true
				},
				{
					"name": "withhash",
					"type": "enum",
					"enum": [
						"WITHHASH"
					],
					"optional": true
				},
				{
					"command": "COUNT",
					"name": "count",
					"type": "integer",
					"optional": true
				},
				{
					"name": "order",
					"type": "enum",
					"enum": [
						"ASC",
						"DESC"
					],
					"optional": true
				},
				{
					"command": "STORE",
					"name": "key",
					"type": "key",
					"optional": true
				},
				{
					"command": "STOREDIST",
					"name": "key",
					"type": "key",
					"optional": true
				}
			],
			"since": "3.2.0",
			"group": "geo"
		},
		"GEORADIUSBYMEMBER": {
			"summary": "Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member",
			"complexity": "O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string"
				},
				{
					"name": "radius",
					"type": "double"
				},
				{
					"name": "unit",
					"type": "enum",
					"enum": [
						"m",
						"km",
						"ft",
						"mi"
					]
				},
				{
					"name": "withcoord",
					"type": "enum",
					"enum": [
						"WITHCOORD"
					],
					"optional": true
				},
				{
					"name": "withdist",
					"type": "enum",
					"enum": [
						"WITHDIST"
					],
					"optional": true
				},
				{
					"name": "withhash",
					"type": "enum",
					"enum": [
						"WITHHASH"
					],
					"optional": true
				},
				{
					"command": "COUNT",
					"name": "count",
					"type": "integer",
					"optional": true
				},
				{
					"name": "order",
					"type": "enum",
					"enum": [
						"ASC",
						"DESC"
					],
					"optional": true
				},
				{
					"command": "STORE",
					"name": "key",
					"type": "key",
					"optional": true
				},
				{
					"command": "STOREDIST",
					"name": "key",
					"type": "key",
					"optional": true
				}
			],
			"since": "3.2.0",
			"group": "geo"
		},
		"GET": {
			"summary": "Get the value of a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"GETBIT": {
			"summary": "Returns the bit value at offset in the string value stored at key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "offset",
					"type": "integer"
				}
			],
			"since": "2.2.0",
			"group": "string"
		},
		"GETRANGE": {
			"summary": "Get a substring of the string stored at a key",
			"complexity": "O(N) where N is the length of the returned string. The complexity is ultimately determined by the returned length, but because creating a substring from an existing string is very cheap, it can be considered O(1) for small strings.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "start",
					"type": "integer"
				},
				{
					"name": "end",
					"type": "integer"
				}
			],
			"since": "2.4.0",
			"group": "string"
		},
		"GETSET": {
			"summary": "Set the string value of a key and return its old value",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"HDEL": {
			"summary": "Delete one or more hash fields",
			"complexity": "O(N) where N is the number of fields to be removed.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string",
					"multiple": true
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HEXISTS": {
			"summary": "Determine if a hash field exists",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HGET": {
			"summary": "Get the value of a hash field",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HGETALL": {
			"summary": "Get all the fields and values in a hash",
			"complexity": "O(N) where N is the size of the hash.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HINCRBY": {
			"summary": "Increment the integer value of a hash field by the given number",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string"
				},
				{
					"name": "increment",
					"type": "integer"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HINCRBYFLOAT": {
			"summary": "Increment the float value of a hash field by the given amount",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string"
				},
				{
					"name": "increment",
					"type": "double"
				}
			],
			"since": "2.6.0",
			"group": "hash"
		},
		"HKEYS": {
			"summary": "Get all the fields in a hash",
			"complexity": "O(N) where N is the size of the hash.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HLEN": {
			"summary": "Get the number of fields in a hash",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HMGET": {
			"summary": "Get the values of all the given hash fields",
			"complexity": "O(N) where N is the number of fields being requested.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string",
					"multiple": true
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HMSET": {
			"summary": "Set multiple hash fields to multiple values",
			"complexity": "O(N) where N is the number of fields being set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": [
						"field",
						"value"
					],
					"type": [
						"string",
						"string"
					],
					"multiple": true
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HSET": {
			"summary": "Set the string value of a hash field",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HSETNX": {
			"summary": "Set the value of a hash field, only if the field does not exist",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"HSTRLEN": {
			"summary": "Get the length of the value of a hash field",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "field",
					"type": "string"
				}
			],
			"since": "3.2.0",
			"group": "hash"
		},
		"HVALS": {
			"summary": "Get all the values in a hash",
			"complexity": "O(N) where N is the size of the hash.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.0.0",
			"group": "hash"
		},
		"INCR": {
			"summary": "Increment the integer value of a key by one",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"INCRBY": {
			"summary": "Increment the integer value of a key by the given amount",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "increment",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"INCRBYFLOAT": {
			"summary": "Increment the float value of a key by the given amount",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "increment",
					"type": "double"
				}
			],
			"since": "2.6.0",
			"group": "string"
		},
		"INFO": {
			"summary": "Get information and statistics about the server",
			"arguments": [
				{
					"name": "section",
					"type": "string",
					"optional": true
				}
			],
			"since": "1.0.0",
			"group": "server"
		},
		"KEYS": {
			"summary": "Find all keys matching the given pattern",
			"complexity": "O(N) with N being the number of keys in the database, under the assumption that the key names in the database and the given pattern have limited length.",
			"arguments": [
				{
					"name": "pattern",
					"type": "pattern"
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"LASTSAVE": {
			"summary": "Get the UNIX time stamp of the last successful save to disk",
			"since": "1.0.0",
			"group": "server"
		},
		"LINDEX": {
			"summary": "Get an element from a list by its index",
			"complexity": "O(N) where N is the number of elements to traverse to get to the element at index. This makes asking for the first or the last element of the list O(1).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "index",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"LINSERT": {
			"summary": "Insert an element before or after another element in a list",
			"complexity": "O(N) where N is the number of elements to traverse before seeing the value pivot. This means that inserting somewhere on the left end on the list (head) can be considered O(1) and inserting somewhere on the right end (tail) is O(N).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "where",
					"type": "enum",
					"enum": [
						"BEFORE",
						"AFTER"
					]
				},
				{
					"name": "pivot",
					"type": "string"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.2.0",
			"group": "list"
		},
		"LLEN": {
			"summary": "Get the length of a list",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"LPOP": {
			"summary": "Remove and get the first element in a list",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"LPUSH": {
			"summary": "Prepend one or multiple values to a list",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"LPUSHX": {
			"summary": "Prepend a value to a list, only if the list exists",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.2.0",
			"group": "list"
		},
		"LRANGE": {
			"summary": "Get a range of elements from a list",
			"complexity": "O(S+N) where S is the distance of start offset from HEAD for small lists, from nearest end (HEAD or TAIL) for large lists; and N is the number of elements in the specified range.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "start",
					"type": "integer"
				},
				{
					"name": "stop",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"LREM": {
			"summary": "Remove elements from a list",
			"complexity": "O(N) where N is the length of the list.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "count",
					"type": "integer"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"LSET": {
			"summary": "Set the value of an element in a list by its index",
			"complexity": "O(N) where N is the length of the list. Setting either the first or the last element of the list is O(1).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "index",
					"type": "integer"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"LTRIM": {
			"summary": "Trim a list to the specified range",
			"complexity": "O(N) where N is the number of elements to be removed by the operation.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "start",
					"type": "integer"
				},
				{
					"name": "stop",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"MGET": {
			"summary": "Get the values of all the given keys",
			"complexity": "O(N) where N is the number of keys to retrieve.",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"MIGRATE": {
			"summary": "Atomically transfer a key from a Redis instance to another one.",
			"complexity": "This command actually executes a DUMP+DEL in the source instance, and a RESTORE in the target instance. See the pages of these commands for time complexity. Also an O(N) data transfer between the two instances is performed.",
			"arguments": [
				{
					"name": "host",
					"type": "string"
				},
				{
					"name": "port",
					"type": "string"
				},
				{
					"name": "key",
					"type": "enum",
					"enum": [
						"key",
						"\"\""
					]
				},
				{
					"name": "destination-db",
					"type": "integer"
				},
				{
					"name": "timeout",
					"type": "integer"
				},
				{
					"name": "copy",
					"type": "enum",
					"enum": [
						"COPY"
					],
					"optional": true
				},
				{
					"name": "replace",
					"type": "enum",
					"enum": [
						"REPLACE"
					],
					"optional": true
				},
				{
					"name": "key",
					"command": "KEYS",
					"type": "key",
					"variadic": true,
					"optional": true
				}
			],
			"since": "2.6.0",
			"group": "generic"
		},
		"MONITOR": {
			"summary": "Listen for all requests received by the server in real time",
			"since": "1.0.0",
			"group": "server"
		},
		"MOVE": {
			"summary": "Move a key to another database",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "db",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"MSET": {
			"summary": "Set multiple keys to multiple values",
			"complexity": "O(N) where N is the number of keys to set.",
			"arguments": [
				{
					"name": [
						"key",
						"value"
					],
					"type": [
						"key",
						"string"
					],
					"multiple": true
				}
			],
			"since": "1.0.1",
			"group": "string"
		},
		"MSETNX": {
			"summary": "Set multiple keys to multiple values, only if none of the keys exist",
			"complexity": "O(N) where N is the number of keys to set.",
			"arguments": [
				{
					"name": [
						"key",
						"value"
					],
					"type": [
						"key",
						"string"
					],
					"multiple": true
				}
			],
			"since": "1.0.1",
			"group": "string"
		},
		"MULTI": {
			"summary": "Mark the start of a transaction block",
			"since": "1.2.0",
			"group": "transactions"
		},
		"OBJECT": {
			"summary": "Inspect the internals of Redis objects",
			"complexity": "O(1) for all the currently implemented subcommands.",
			"since": "2.2.3",
			"group": "generic",
			"arguments": [
				{
					"name": "subcommand",
					"type": "string"
				},
				{
					"name": "arguments",
					"type": "string",
					"optional": true,
					"multiple": true
				}
			]
		},
		"PERSIST": {
			"summary": "Remove the expiration from a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.2.0",
			"group": "generic"
		},
		"PEXPIRE": {
			"summary": "Set a key's time to live in milliseconds",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "milliseconds",
					"type": "integer"
				}
			],
			"since": "2.6.0",
			"group": "generic"
		},
		"PEXPIREAT": {
			"summary": "Set the expiration for a key as a UNIX timestamp specified in milliseconds",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "milliseconds-timestamp",
					"type": "posix time"
				}
			],
			"since": "2.6.0",
			"group": "generic"
		},
		"PFADD": {
			"summary": "Adds the specified elements to the specified HyperLogLog.",
			"complexity": "O(1) to add every element.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "element",
					"type": "string",
					"multiple": true
				}
			],
			"since": "2.8.9",
			"group": "hyperloglog"
		},
		"PFCOUNT": {
			"summary": "Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).",
			"complexity": "O(1) with every small average constant times when called with a single key. O(N) with N being the number of keys, and much bigger constant times, when called with multiple keys.",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "2.8.9",
			"group": "hyperloglog"
		},
		"PFMERGE": {
			"summary": "Merge N different HyperLogLogs into a single one.",
			"complexity": "O(N) to merge N HyperLogLogs, but with high constant times.",
			"arguments": [
				{
					"name": "destkey",
					"type": "key"
				},
				{
					"name": "sourcekey",
					"type": "key",
					"multiple": true
				}
			],
			"since": "2.8.9",
			"group": "hyperloglog"
		},
		"PING": {
			"summary": "Ping the server",
			"arguments": [
				{
					"name": "message",
					"type": "string",
					"optional": true
				}
			],
			"since": "1.0.0",
			"group": "connection"
		},
		"PSETEX": {
			"summary": "Set the value and expiration in milliseconds of a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "milliseconds",
					"type": "integer"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.6.0",
			"group": "string"
		},
		"PSUBSCRIBE": {
			"summary": "Listen for messages published to channels matching the given patterns",
			"complexity": "O(N) where N is the number of patterns the client is already subscribed to.",
			"arguments": [
				{
					"name": [
						"pattern"
					],
					"type": [
						"pattern"
					],
					"multiple": true
				}
			],
			"since": "2.0.0",
			"group": "pubsub"
		},
		"PUBSUB": {
			"summary": "Inspect the state of the Pub/Sub subsystem",
			"complexity": "O(N) for the CHANNELS subcommand, where N is the number of active channels, and assuming constant time pattern matching (relatively short channels and patterns). O(N) for the NUMSUB subcommand, where N is the number of requested channels. O(1) for the NUMPAT subcommand.",
			"arguments": [
				{
					"name": "subcommand",
					"type": "string"
				},
				{
					"name": "argument",
					"type": "string",
					"optional": true,
					"multiple": true
				}
			],
			"since": "2.8.0",
			"group": "pubsub"
		},
		"PTTL": {
			"summary": "Get the time to live for a key in milliseconds",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.6.0",
			"group": "generic"
		},
		"PUBLISH": {
			"summary": "Post a message to a channel",
			"complexity": "O(N+M) where N is the number of clients subscribed to the receiving channel and M is the total number of subscribed patterns (by any client).",
			"arguments": [
				{
					"name": "channel",
					"type": "string"
				},
				{
					"name": "message",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "pubsub"
		},
		"PUNSUBSCRIBE": {
			"summary": "Stop listening for messages posted to channels matching the given patterns",
			"complexity": "O(N+M) where N is the number of patterns the client is already subscribed and M is the number of total patterns subscribed in the system (by any client).",
			"arguments": [
				{
					"name": "pattern",
					"type": "pattern",
					"optional": true,
					"multiple": true
				}
			],
			"since": "2.0.0",
			"group": "pubsub"
		},
		"QUIT": {
			"summary": "Close the connection",
			"since": "1.0.0",
			"group": "connection"
		},
		"RANDOMKEY": {
			"summary": "Return a random key from the keyspace",
			"complexity": "O(1)",
			"since": "1.0.0",
			"group": "generic"
		},
		"READONLY": {
			"summary": "Enables read queries for a connection to a cluster slave node",
			"complexity": "O(1)",
			"since": "3.0.0",
			"group": "cluster"
		},
		"READWRITE": {
			"summary": "Disables read queries for a connection to a cluster slave node",
			"complexity": "O(1)",
			"since": "3.0.0",
			"group": "cluster"
		},
		"RENAME": {
			"summary": "Rename a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "newkey",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"RENAMENX": {
			"summary": "Rename a key, only if the new key does not exist",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "newkey",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"RESTORE": {
			"summary": "Create a key using the provided serialized value, previously obtained using DUMP.",
			"complexity": "O(1) to create the new key and additional O(N*M) to reconstruct the serialized value, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1). However for sorted set values the complexity is O(N*M*log(N)) because inserting values into sorted sets is O(log(N)).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "ttl",
					"type": "integer"
				},
				{
					"name": "serialized-value",
					"type": "string"
				},
				{
					"name": "replace",
					"type": "enum",
					"enum": [
						"REPLACE"
					],
					"optional": true
				}
			],
			"since": "2.6.0",
			"group": "generic"
		},
		"ROLE": {
			"summary": "Return the role of the instance in the context of replication",
			"since": "2.8.12",
			"group": "server"
		},
		"RPOP": {
			"summary": "Remove and get the last element in a list",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"RPOPLPUSH": {
			"summary": "Remove the last element in a list, prepend it to another list and return it",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "source",
					"type": "key"
				},
				{
					"name": "destination",
					"type": "key"
				}
			],
			"since": "1.2.0",
			"group": "list"
		},
		"RPUSH": {
			"summary": "Append one or multiple values to a list",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "list"
		},
		"RPUSHX": {
			"summary": "Append a value to a list, only if the list exists",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.2.0",
			"group": "list"
		},
		"SADD": {
			"summary": "Add one or more members to a set",
			"complexity": "O(N) where N is the number of members to be added.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SAVE": {
			"summary": "Synchronously save the dataset to disk",
			"since": "1.0.0",
			"group": "server"
		},
		"SCARD": {
			"summary": "Get the number of members in a set",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SCRIPT DEBUG": {
			"summary": "Set the debug mode for executed scripts.",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "mode",
					"type": "enum",
					"enum": [
						"YES",
						"SYNC",
						"NO"
					]
				}
			],
			"since": "3.2.0",
			"group": "scripting"
		},
		"SCRIPT EXISTS": {
			"summary": "Check existence of scripts in the script cache.",
			"complexity": "O(N) with N being the number of scripts to check (so checking a single script is an O(1) operation).",
			"arguments": [
				{
					"name": "script",
					"type": "string",
					"multiple": true
				}
			],
			"since": "2.6.0",
			"group": "scripting"
		},
		"SCRIPT FLUSH": {
			"summary": "Remove all the scripts from the script cache.",
			"complexity": "O(N) with N being the number of scripts in cache",
			"since": "2.6.0",
			"group": "scripting"
		},
		"SCRIPT KILL": {
			"summary": "Kill the script currently in execution.",
			"complexity": "O(1)",
			"since": "2.6.0",
			"group": "scripting"
		},
		"SCRIPT LOAD": {
			"summary": "Load the specified Lua script into the script cache.",
			"complexity": "O(N) with N being the length in bytes of the script body.",
			"arguments": [
				{
					"name": "script",
					"type": "string"
				}
			],
			"since": "2.6.0",
			"group": "scripting"
		},
		"SDIFF": {
			"summary": "Subtract multiple sets",
			"complexity": "O(N) where N is the total number of elements in all given sets.",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SDIFFSTORE": {
			"summary": "Subtract multiple sets and store the resulting set in a key",
			"complexity": "O(N) where N is the total number of elements in all given sets.",
			"arguments": [
				{
					"name": "destination",
					"type": "key"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SELECT": {
			"summary": "Change the selected database for the current connection",
			"arguments": [
				{
					"name": "index",
					"type": "integer"
				}
			],
			"since": "1.0.0",
			"group": "connection"
		},
		"SET": {
			"summary": "Set the string value of a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string"
				},
				{
					"command": "EX",
					"name": "seconds",
					"type": "integer",
					"optional": true
				},
				{
					"command": "PX",
					"name": "milliseconds",
					"type": "integer",
					"optional": true
				},
				{
					"name": "condition",
					"type": "enum",
					"enum": [
						"NX",
						"XX"
					],
					"optional": true
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"SETBIT": {
			"summary": "Sets or clears the bit at offset in the string value stored at key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "offset",
					"type": "integer"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.2.0",
			"group": "string"
		},
		"SETEX": {
			"summary": "Set the value and expiration of a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "seconds",
					"type": "integer"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "string"
		},
		"SETNX": {
			"summary": "Set the value of a key, only if the key does not exist",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "string"
		},
		"SETRANGE": {
			"summary": "Overwrite part of a string at key starting at the specified offset",
			"complexity": "O(1), not counting the time taken to copy the new string in place. Usually, this string is very small so the amortized complexity is O(1). Otherwise, complexity is O(M) with M being the length of the value argument.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "offset",
					"type": "integer"
				},
				{
					"name": "value",
					"type": "string"
				}
			],
			"since": "2.2.0",
			"group": "string"
		},
		"SHUTDOWN": {
			"summary": "Synchronously save the dataset to disk and then shut down the server",
			"arguments": [
				{
					"name": "save-mode",
					"type": "enum",
					"enum": [
						"NOSAVE",
						"SAVE"
					],
					"optional": true
				}
			],
			"since": "1.0.0",
			"group": "server"
		},
		"SINTER": {
			"summary": "Intersect multiple sets",
			"complexity": "O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SINTERSTORE": {
			"summary": "Intersect multiple sets and store the resulting set in a key",
			"complexity": "O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.",
			"arguments": [
				{
					"name": "destination",
					"type": "key"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SISMEMBER": {
			"summary": "Determine if a given value is a member of a set",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SLAVEOF": {
			"summary": "Make the server a slave of another instance, or promote it as master",
			"arguments": [
				{
					"name": "host",
					"type": "string"
				},
				{
					"name": "port",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "server"
		},
		"SLOWLOG": {
			"summary": "Manages the Redis slow queries log",
			"arguments": [
				{
					"name": "subcommand",
					"type": "string"
				},
				{
					"name": "argument",
					"type": "string",
					"optional": true
				}
			],
			"since": "2.2.12",
			"group": "server"
		},
		"SMEMBERS": {
			"summary": "Get all the members in a set",
			"complexity": "O(N) where N is the set cardinality.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SMOVE": {
			"summary": "Move a member from one set to another",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "source",
					"type": "key"
				},
				{
					"name": "destination",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string"
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SORT": {
			"summary": "Sort the elements in a list, set or sorted set",
			"complexity": "O(N+M*log(M)) where N is the number of elements in the list or set to sort, and M the number of returned elements. When the elements are not sorted, complexity is currently O(N) as there is a copy step that will be avoided in next releases.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"command": "BY",
					"name": "pattern",
					"type": "pattern",
					"optional": true
				},
				{
					"command": "LIMIT",
					"name": [
						"offset",
						"count"
					],
					"type": [
						"integer",
						"integer"
					],
					"optional": true
				},
				{
					"command": "GET",
					"name": "pattern",
					"type": "string",
					"optional": true,
					"multiple": true
				},
				{
					"name": "order",
					"type": "enum",
					"enum": [
						"ASC",
						"DESC"
					],
					"optional": true
				},
				{
					"name": "sorting",
					"type": "enum",
					"enum": [
						"ALPHA"
					],
					"optional": true
				},
				{
					"command": "STORE",
					"name": "destination",
					"type": "key",
					"optional": true
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"SPOP": {
			"summary": "Remove and return one or multiple random members from a set",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "count",
					"type": "integer",
					"optional": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SRANDMEMBER": {
			"summary": "Get one or multiple random members from a set",
			"complexity": "Without the count argument O(1), otherwise O(N) where N is the absolute value of the passed count.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "count",
					"type": "integer",
					"optional": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SREM": {
			"summary": "Remove one or more members from a set",
			"complexity": "O(N) where N is the number of members to be removed.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"STRLEN": {
			"summary": "Get the length of the value stored in a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "2.2.0",
			"group": "string"
		},
		"SUBSCRIBE": {
			"summary": "Listen for messages published to the given channels",
			"complexity": "O(N) where N is the number of channels to subscribe to.",
			"arguments": [
				{
					"name": [
						"channel"
					],
					"type": [
						"string"
					],
					"multiple": true
				}
			],
			"since": "2.0.0",
			"group": "pubsub"
		},
		"SUNION": {
			"summary": "Add multiple sets",
			"complexity": "O(N) where N is the total number of elements in all given sets.",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SUNIONSTORE": {
			"summary": "Add multiple sets and store the resulting set in a key",
			"complexity": "O(N) where N is the total number of elements in all given sets.",
			"arguments": [
				{
					"name": "destination",
					"type": "key"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "1.0.0",
			"group": "set"
		},
		"SYNC": {
			"summary": "Internal command used for replication",
			"since": "1.0.0",
			"group": "server"
		},
		"TIME": {
			"summary": "Return the current server time",
			"complexity": "O(1)",
			"since": "2.6.0",
			"group": "server"
		},
		"TTL": {
			"summary": "Get the time to live for a key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"TYPE": {
			"summary": "Determine the type stored at key",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.0.0",
			"group": "generic"
		},
		"UNSUBSCRIBE": {
			"summary": "Stop listening for messages posted to the given channels",
			"complexity": "O(N) where N is the number of clients already subscribed to a channel.",
			"arguments": [
				{
					"name": "channel",
					"type": "string",
					"optional": true,
					"multiple": true
				}
			],
			"since": "2.0.0",
			"group": "pubsub"
		},
		"UNWATCH": {
			"summary": "Forget about all watched keys",
			"complexity": "O(1)",
			"since": "2.2.0",
			"group": "transactions"
		},
		"WAIT": {
			"summary": "Wait for the synchronous replication of all the write commands sent in the context of the current connection",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "numslaves",
					"type": "integer"
				},
				{
					"name": "timeout",
					"type": "integer"
				}
			],
			"since": "3.0.0",
			"group": "generic"
		},
		"WATCH": {
			"summary": "Watch the given keys to determine execution of the MULTI/EXEC block",
			"complexity": "O(1) for every key.",
			"arguments": [
				{
					"name": "key",
					"type": "key",
					"multiple": true
				}
			],
			"since": "2.2.0",
			"group": "transactions"
		},
		"ZADD": {
			"summary": "Add one or more members to a sorted set, or update its score if it already exists",
			"complexity": "O(log(N)) for each item added, where N is the number of elements in the sorted set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "condition",
					"type": "enum",
					"enum": [
						"NX",
						"XX"
					],
					"optional": true
				},
				{
					"name": "change",
					"type": "enum",
					"enum": [
						"CH"
					],
					"optional": true
				},
				{
					"name": "increment",
					"type": "enum",
					"enum": [
						"INCR"
					],
					"optional": true
				},
				{
					"name": [
						"score",
						"member"
					],
					"type": [
						"double",
						"string"
					],
					"multiple": true
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZCARD": {
			"summary": "Get the number of members in a sorted set",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZCOUNT": {
			"summary": "Count the members in a sorted set with scores within the given values",
			"complexity": "O(log(N)) with N being the number of elements in the sorted set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "min",
					"type": "double"
				},
				{
					"name": "max",
					"type": "double"
				}
			],
			"since": "2.0.0",
			"group": "sorted_set"
		},
		"ZINCRBY": {
			"summary": "Increment the score of a member in a sorted set",
			"complexity": "O(log(N)) where N is the number of elements in the sorted set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "increment",
					"type": "integer"
				},
				{
					"name": "member",
					"type": "string"
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZINTERSTORE": {
			"summary": "Intersect multiple sorted sets and store the resulting sorted set in a new key",
			"complexity": "O(N*K)+O(M*log(M)) worst case with N being the smallest input sorted set, K being the number of input sorted sets and M being the number of elements in the resulting sorted set.",
			"arguments": [
				{
					"name": "destination",
					"type": "key"
				},
				{
					"name": "numkeys",
					"type": "integer"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				},
				{
					"command": "WEIGHTS",
					"name": "weight",
					"type": "integer",
					"variadic": true,
					"optional": true
				},
				{
					"command": "AGGREGATE",
					"name": "aggregate",
					"type": "enum",
					"enum": [
						"SUM",
						"MIN",
						"MAX"
					],
					"optional": true
				}
			],
			"since": "2.0.0",
			"group": "sorted_set"
		},
		"ZLEXCOUNT": {
			"summary": "Count the number of members in a sorted set between a given lexicographical range",
			"complexity": "O(log(N)) with N being the number of elements in the sorted set.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "min",
					"type": "string"
				},
				{
					"name": "max",
					"type": "string"
				}
			],
			"since": "2.8.9",
			"group": "sorted_set"
		},
		"ZRANGE": {
			"summary": "Return a range of members in a sorted set, by index",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "start",
					"type": "integer"
				},
				{
					"name": "stop",
					"type": "integer"
				},
				{
					"name": "withscores",
					"type": "enum",
					"enum": [
						"WITHSCORES"
					],
					"optional": true
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZRANGEBYLEX": {
			"summary": "Return a range of members in a sorted set, by lexicographical range",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "min",
					"type": "string"
				},
				{
					"name": "max",
					"type": "string"
				},
				{
					"command": "LIMIT",
					"name": [
						"offset",
						"count"
					],
					"type": [
						"integer",
						"integer"
					],
					"optional": true
				}
			],
			"since": "2.8.9",
			"group": "sorted_set"
		},
		"ZREVRANGEBYLEX": {
			"summary": "Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "max",
					"type": "string"
				},
				{
					"name": "min",
					"type": "string"
				},
				{
					"command": "LIMIT",
					"name": [
						"offset",
						"count"
					],
					"type": [
						"integer",
						"integer"
					],
					"optional": true
				}
			],
			"since": "2.8.9",
			"group": "sorted_set"
		},
		"ZRANGEBYSCORE": {
			"summary": "Return a range of members in a sorted set, by score",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "min",
					"type": "double"
				},
				{
					"name": "max",
					"type": "double"
				},
				{
					"name": "withscores",
					"type": "enum",
					"enum": [
						"WITHSCORES"
					],
					"optional": true
				},
				{
					"command": "LIMIT",
					"name": [
						"offset",
						"count"
					],
					"type": [
						"integer",
						"integer"
					],
					"optional": true
				}
			],
			"since": "1.0.5",
			"group": "sorted_set"
		},
		"ZRANK": {
			"summary": "Determine the index of a member in a sorted set",
			"complexity": "O(log(N))",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "sorted_set"
		},
		"ZREM": {
			"summary": "Remove one or more members from a sorted set",
			"complexity": "O(M*log(N)) with N being the number of elements in the sorted set and M the number of elements to be removed.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string",
					"multiple": true
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZREMRANGEBYLEX": {
			"summary": "Remove all members in a sorted set between the given lexicographical range",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "min",
					"type": "string"
				},
				{
					"name": "max",
					"type": "string"
				}
			],
			"since": "2.8.9",
			"group": "sorted_set"
		},
		"ZREMRANGEBYRANK": {
			"summary": "Remove all members in a sorted set within the given indexes",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "start",
					"type": "integer"
				},
				{
					"name": "stop",
					"type": "integer"
				}
			],
			"since": "2.0.0",
			"group": "sorted_set"
		},
		"ZREMRANGEBYSCORE": {
			"summary": "Remove all members in a sorted set within the given scores",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "min",
					"type": "double"
				},
				{
					"name": "max",
					"type": "double"
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZREVRANGE": {
			"summary": "Return a range of members in a sorted set, by index, with scores ordered from high to low",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "start",
					"type": "integer"
				},
				{
					"name": "stop",
					"type": "integer"
				},
				{
					"name": "withscores",
					"type": "enum",
					"enum": [
						"WITHSCORES"
					],
					"optional": true
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZREVRANGEBYSCORE": {
			"summary": "Return a range of members in a sorted set, by score, with scores ordered from high to low",
			"complexity": "O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "max",
					"type": "double"
				},
				{
					"name": "min",
					"type": "double"
				},
				{
					"name": "withscores",
					"type": "enum",
					"enum": [
						"WITHSCORES"
					],
					"optional": true
				},
				{
					"command": "LIMIT",
					"name": [
						"offset",
						"count"
					],
					"type": [
						"integer",
						"integer"
					],
					"optional": true
				}
			],
			"since": "2.2.0",
			"group": "sorted_set"
		},
		"ZREVRANK": {
			"summary": "Determine the index of a member in a sorted set, with scores ordered from high to low",
			"complexity": "O(log(N))",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string"
				}
			],
			"since": "2.0.0",
			"group": "sorted_set"
		},
		"ZSCORE": {
			"summary": "Get the score associated with the given member in a sorted set",
			"complexity": "O(1)",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "member",
					"type": "string"
				}
			],
			"since": "1.2.0",
			"group": "sorted_set"
		},
		"ZUNIONSTORE": {
			"summary": "Add multiple sorted sets and store the resulting sorted set in a new key",
			"complexity": "O(N)+O(M log(M)) with N being the sum of the sizes of the input sorted sets, and M being the number of elements in the resulting sorted set.",
			"arguments": [
				{
					"name": "destination",
					"type": "key"
				},
				{
					"name": "numkeys",
					"type": "integer"
				},
				{
					"name": "key",
					"type": "key",
					"multiple": true
				},
				{
					"command": "WEIGHTS",
					"name": "weight",
					"type": "integer",
					"variadic": true,
					"optional": true
				},
				{
					"command": "AGGREGATE",
					"name": "aggregate",
					"type": "enum",
					"enum": [
						"SUM",
						"MIN",
						"MAX"
					],
					"optional": true
				}
			],
			"since": "2.0.0",
			"group": "sorted_set"
		},
		"SCAN": {
			"summary": "Incrementally iterate the keys space",
			"complexity": "O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection.",
			"arguments": [
				{
					"name": "cursor",
					"type": "integer"
				},
				{
					"command": "MATCH",
					"name": "pattern",
					"type": "pattern",
					"optional": true
				},
				{
					"command": "COUNT",
					"name": "count",
					"type": "integer",
					"optional": true
				}
			],
			"since": "2.8.0",
			"group": "generic"
		},
		"SSCAN": {
			"summary": "Incrementally iterate Set elements",
			"complexity": "O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "cursor",
					"type": "integer"
				},
				{
					"command": "MATCH",
					"name": "pattern",
					"type": "pattern",
					"optional": true
				},
				{
					"command": "COUNT",
					"name": "count",
					"type": "integer",
					"optional": true
				}
			],
			"since": "2.8.0",
			"group": "set"
		},
		"HSCAN": {
			"summary": "Incrementally iterate hash fields and associated values",
			"complexity": "O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "cursor",
					"type": "integer"
				},
				{
					"command": "MATCH",
					"name": "pattern",
					"type": "pattern",
					"optional": true
				},
				{
					"command": "COUNT",
					"name": "count",
					"type": "integer",
					"optional": true
				}
			],
			"since": "2.8.0",
			"group": "hash"
		},
		"ZSCAN": {
			"summary": "Incrementally iterate sorted sets elements and associated scores",
			"complexity": "O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..",
			"arguments": [
				{
					"name": "key",
					"type": "key"
				},
				{
					"name": "cursor",
					"type": "integer"
				},
				{
					"command": "MATCH",
					"name": "pattern",
					"type": "pattern",
					"optional": true
				},
				{
					"command": "COUNT",
					"name": "count",
					"type": "integer",
					"optional": true
				}
			],
			"since": "2.8.0",
			"group": "sorted_set"
		}
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ServerSelector = __webpack_require__(6);

	var ServerStatus = React.createClass({
	    displayName: 'ServerStatus',

	    getInitialState: function getInitialState() {
	        this.getStatus(this.props.hosts[0]);

	        return {
	            status: ''
	        };
	    },

	    selectorChanged: function selectorChanged(field) {
	        this.getStatus(field);
	    },

	    getStatus: function getStatus(host) {
	        var _this = this;

	        var options = {
	            url: this.props.path + '/info',
	            dataType: 'json',
	            type: 'POST',
	            data: { host: host }
	        };

	        this.serverRequest = $.ajax(options).always(function (result) {
	            _this.setState({
	                status: result.responseText
	            });
	        });
	    },

	    render: function render() {
	        var Selector = React.createElement(ServerSelector, { onChange: this.selectorChanged.bind(this), hosts: this.props.hosts });

	        if (this.state.status) {
	            var table = _renderStatus(this.state.status);
	            return React.createElement(
	                'div',
	                null,
	                Selector,
	                React.createElement(
	                    'table',
	                    null,
	                    React.createElement(
	                        'tbody',
	                        null,
	                        table.map(function (row, i) {
	                            return React.createElement(
	                                'tr',
	                                { key: i },
	                                row.map(function (col, j) {
	                                    return React.createElement(
	                                        'td',
	                                        { key: j },
	                                        col
	                                    );
	                                })
	                            );
	                        })
	                    )
	                )
	            );
	        } else {
	            return React.createElement(
	                'div',
	                null,
	                Selector,
	                React.createElement(
	                    'div',
	                    null,
	                    'Results will be displayed here'
	                )
	            );
	        }
	    }
	});

	function _renderStatus(status) {
	    var lines = status.split('\n');
	    var table = [];
	    lines.forEach(function (line) {
	        if (line) {
	            var pair = line.split(':');
	            var obj = [];
	            obj.push(pair[0]);
	            obj.push(pair[1]);
	            table.push(obj);
	        }
	    });

	    return table;
	}

	module.exports = ServerStatus;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var ServerSelector = React.createClass({
	    displayName: "ServerSelector",

	    getInitialState: function getInitialState() {
	        return {
	            selectValue: this.props.hosts[0]
	        };
	    },

	    changed: function changed(e) {
	        this.state.selectValue = e.target.value;
	        this.props.onChange(e.target.value);
	    },

	    render: function render() {

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "row" },
	                React.createElement(
	                    "div",
	                    { className: "col-lg-10" },
	                    React.createElement(
	                        "div",
	                        { className: "col-lg-4" },
	                        "Select server:"
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "col-lg-6" },
	                        React.createElement(
	                            "select",
	                            { value: this.state.selectValue, onChange: this.changed },
	                            this.props.hosts.map(function (host, i) {
	                                return React.createElement(
	                                    "option",
	                                    { id: i, name: "{host}" },
	                                    host
	                                );
	                            }),
	                            ";"
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "row" },
	                React.createElement("p", null)
	            )
	        );
	    }
	});

	function _renderStatus(status) {
	    var lines = status.split('\n');
	    var table = [];
	    lines.forEach(function (line) {
	        if (line) {
	            var pair = line.split(':');
	            var obj = [];
	            obj.push(pair[0]);
	            obj.push(pair[1]);
	            table.push(obj);
	        }
	    });

	    return table;
	}

	module.exports = ServerSelector;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var ClusterStatus = React.createClass({
	    displayName: 'ClusterStatus',

	    getInitialState: function getInitialState() {
	        return {
	            status: ''
	        };
	    },

	    initialize: function initialize() {
	        var _this = this;

	        var options = {
	            url: this.props.path + '/command',
	            dataType: 'json',
	            type: 'POST',
	            data: { command: 'cluster nodes' }
	        };

	        this.serverRequest = $.ajax(options).always(function (result) {
	            _this.setState({
	                status: result.responseText
	            });
	        });
	    },

	    render: function render() {
	        var _this2 = this;

	        if (this.state.status) {
	            var _ret = function () {
	                var cluster = _renderStatus(_this2.state.status);
	                var tables = [];
	                var i = 0;

	                Object.keys(cluster).forEach(function (key) {
	                    tables.push(React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'h3',
	                            null,
	                            'Hash slot: ',
	                            cluster[key][0][8]
	                        ),
	                        React.createElement(
	                            'table',
	                            { id: i++ },
	                            React.createElement(
	                                'thead',
	                                null,
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'id'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'ip:port'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'flags'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'master'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'ping-sent'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'pong-recv'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'config-epoch'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'link-state'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'tbody',
	                                null,
	                                cluster[key].map(function (row, i) {
	                                    return React.createElement(
	                                        'tr',
	                                        { key: i },
	                                        row.map(function (col, j) {
	                                            if (j < 8) {
	                                                var style = {};
	                                                if (col == 'connected') {
	                                                    style.backgroundColor = '#90EE90';
	                                                } else if (col == 'disconnected') {
	                                                    style.backgroundColor = '#FFC1C1';
	                                                }

	                                                return React.createElement(
	                                                    'td',
	                                                    { style: style, key: j },
	                                                    col
	                                                );
	                                            }
	                                        })
	                                    );
	                                })
	                            )
	                        ),
	                        React.createElement('br', null)
	                    ));
	                });

	                return {
	                    v: React.createElement(
	                        'div',
	                        null,
	                        tables
	                    )
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	            return React.createElement(
	                'div',
	                null,
	                'Results will be displayed here'
	            );
	        }
	    }
	});

	function _renderStatus(status) {
	    var array = status.split('\n');
	    var table = [];
	    // put everything in an array
	    array.forEach(function (line) {
	        if (line) {
	            table.push(line.split(' '));
	        }
	    });

	    // organize into sets, grouped by the master
	    var clusters = {};
	    table.forEach(function (row) {
	        var master = row[3] == '-' ? row[0] : row[3];

	        if (!clusters[master]) {
	            clusters[master] = [];
	        }

	        clusters[master].push(row);
	    });

	    // order items in each set
	    Object.keys(clusters).forEach(function (key) {
	        clusters[key] = clusters[key].sort(function (a, b) {
	            if (a[[3] > b[3]]) {
	                return -1;
	            } else if (a[3] > b[3]) {
	                return 1;
	            }
	            return 0;
	        });
	    });

	    return clusters;
	}

	module.exports = ClusterStatus;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var SystemStatus = React.createClass({
	    displayName: 'SystemStatus',

	    getInitialState: function getInitialState() {
	        var _this = this;

	        var status = [];

	        this.props.hosts.forEach(function (host) {
	            _this.getStatus(host, function (err, result) {
	                status.push([host].concat(_this._renderStatus(result)));
	                _this.setState({
	                    status: status
	                });
	            });
	        });

	        return {
	            systemStatusList: this.props.systemStatusList || ['used_memory'],
	            status: status
	        };
	    },

	    getStatus: function getStatus(host, callback) {
	        var options = {
	            url: this.props.path + '/info',
	            dataType: 'json',
	            type: 'POST',
	            data: { host: host }
	        };

	        this.serverRequest = $.ajax(options).always(function (result) {
	            callback(null, result.responseText);
	        });
	    },

	    render: function render() {
	        if (this.state.status.length > 0) {
	            var counter = 0;
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'table',
	                    null,
	                    React.createElement(
	                        'thead',
	                        null,
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                'Server'
	                            ),
	                            this.state.status[0].map(function (col, j) {
	                                if (counter++ % 2 == 1) {
	                                    return React.createElement(
	                                        'td',
	                                        { key: j },
	                                        col
	                                    );
	                                }
	                            })
	                        )
	                    ),
	                    React.createElement(
	                        'tbody',
	                        null,
	                        this.state.status.map(function (row, i) {
	                            counter = 0;
	                            return React.createElement(
	                                'tr',
	                                { key: i },
	                                row.map(function (col, j) {
	                                    if (counter++ % 2 == 0) {
	                                        return React.createElement(
	                                            'td',
	                                            { key: j },
	                                            col
	                                        );
	                                    }
	                                })
	                            );
	                        })
	                    )
	                )
	            );
	        } else {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    null,
	                    'Results will be displayed here'
	                )
	            );
	        }
	    },

	    _renderStatus: function _renderStatus(status) {
	        var _this2 = this;

	        var lines = status.split('\n');
	        var table = [];
	        lines.forEach(function (line) {
	            if (line) {
	                var pair = line.split(':');
	                if (_this2.state.systemStatusList.indexOf(pair[0]) > -1) {
	                    table.push(pair[0]);
	                    table.push(pair[1]);
	                }
	            }
	        });

	        return table;
	    }

	});

	module.exports = SystemStatus;

/***/ }
/******/ ]);