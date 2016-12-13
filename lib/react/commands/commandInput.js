'use strict';

const Autosuggest = require('react-autosuggest')
const React = require('react');
const Commands = require('./commands');

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
var commands;

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return commands.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class CommandInput extends React.Component { // eslint-disable-line no-undef
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      text: event.target.value
    });

    commands.forEach((command) => {
      if (command.name == newValue) {
        this.setState({
          summary: command.summary,
          complexity: command.complexity
        });
      }
    });
  };

  onKeyDown = (event) =>  {
      if (event.keyCode === 13) { // Enter
          // Stop it here
          event.preventDefault();
          event.stopPropagation();

          // invoke button press
          this.onButtonClick();
      }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getText = () => {
      return this.state.text;
  };


  setOutput = ((output) => {
      this.setState({
          output: output
      });
  });

  onButtonClick = ((evt) => {
      var options = {
          url: this.props.path + '/command',
          dataType: 'json', 
          type: 'POST',
          data: {command: this.getText()},
      }

      this.serverRequest = $.ajax(options).always((result) => {
          if (result.responseText) {
            this.state.output.setText(result.responseText);
          }
          else if (typeof result === 'object') {
            let str = '';
            result.forEach((line) => {
              str = str + line + '<br/>';
            });
            this.state.output.setText(str);
          }
          else {
            this.state.output.setText(result);
          }
      });
  })

  render() {
    commands = commands || this.props.commands || new Commands().get();
    //commands = this.props.commands;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'e.g. SET hello world',
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown 
    };

    var css =  {
      "display": "inline-block",
      "verticalAlign": "middle"    
    }

    return (
          <div>
            <div className="row">
              <div className="autosuggest">
                  <Autosuggest // eslint-disable-line react/jsx-no-undef
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} 
                    />
              </div>
              <label id="summaryLabel" className="autosuggest-summary">
                {this.state.summary} {this.state.complexity ? ' - ' + this.state.complexity : ''}
              </label>
            </div>
              <div className="row">
                  <button className="btn btn-primary" onClick={this.onButtonClick}>Run Command</button>
              </div>
          </div>
    );
  }
}

module.exports = CommandInput;