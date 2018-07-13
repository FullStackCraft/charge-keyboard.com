import React, { Component } from 'react';
import './styles/App.css';

// external library requires() more test test test test test test
const axios = require('axios');
const validator = require("email-validator");

class App extends Component {
  constructor() {
    console.log(process.env.REACT_APP_ROOT_URL);
    super();
    this.state = {
      sEmail: '',
      sSubmitButtonText: 'submit',
      sEmailPlaceholder:'your_email@email.com',
      bEmailFieldsDisabled: false,
      sKey1Class: 'btn2',
      sKey2Class: 'btn2',
      sKey3Class: 'btn2',
      sKey4Class: 'btn2'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.autoPressKeys = this.autoPressKeys.bind(this);
    this.activateButton = this.activateButton.bind(this);
    this.deactivateButton = this.deactivateButton.bind(this);
  }
  handleChange(i, event) {
    console.log(i.target.value);
    console.log(i.target.name);
     this.setState({ [i.target.name]: i.target.value });
  }
  handleKeyDown(e) {
        /**
         * Note: Pressing enter in some input in a browser forms
         *  triggers onClick on the first child button
         *
         * So, prevent `enter` from triggering `onClick` on any buttons
         *  and instead trigger onSubmit
         */
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submit();
    }
  }
  handleSubmit(e) {
      /**
       * Prevent submit from reloading the page
       */
      e.preventDefault();
      e.stopPropagation();
      this.submit();
  }
  submit() {
    console.log(this.state.sEmail);
    if (!validator.validate(this.state.sEmail)) {
      this.setState({sEmail: '', sEmailPlaceholder: 'Invalid email format!', sSubmitButtonText: 'try again'});
      return;
    }
    axios.post(process.env.REACT_APP_ROOT_URL + '/email', {
      sEmail: this.state.sEmail
    })
    .then((response) => {
      this.setState({sEmail: '', sEmailPlaceholder: 'thank you!', sSubmitButtonText: 'thank you!', bEmailFieldsDisabled: true});
      console.log(response);
    })
    .catch((error) => {
      this.setState({sEmail: '', sEmailPlaceholder: 'Unknown error!', sSubmitButtonText: 'try again'});
      console.log(error);
    });
  }
  autoPressKeys() {
    let aStateRefs = ["sKey1Class","sKey2Class","sKey3Class","sKey4Class"];
    aStateRefs.forEach((sRef, iIndex) => {
      setTimeout(() => this.activateButton(sRef), iIndex*250);
      setTimeout(() => this.deactivateButton(sRef), iIndex*250 + 250); // offset for time pressed (1 second)
    });
  }
  activateButton(sRef) {
    setInterval(() => {
      this.setState({ [sRef]: "btn2 active" });// add ':active' class
    }, 1000);
  }
  deactivateButton(sRef) {
    setInterval(() => {
      this.setState({ [sRef]: "btn2" });// remove ':active' class
    }, 1000);
  }
  render() {
    return (
      <div>
        <div className="keyboard">
          <div className="row">
            <button type="button" className={this.state.sKey1Class}><span>Ch</span></button>
            <button type="button" className={this.state.sKey2Class}><span>a</span></button>
            <button type="button" className={this.state.sKey3Class}><span>r</span></button>
            <button type="button" className={this.state.sKey4Class}><span>ge.</span></button>
          </div>
        </div>
        <div className="title">
          <h1><span className="neon">Charge.</span><br />The<br />world's<br />first<br />keyboard<br />that<br />charges itself<br />while<br />you<br />type.</h1><br />Interested?<br />Leave your email.<br/>We'll email you only once:<br />when we launch.<br /><br />
          <div className="wrapper">
            <form onKeyDown={this.handleKeyDown} onSubmit={this.handleSubmit}>
              <div className="group"><input disabled={this.state.bEmailFieldsDisabled} type="text" required="required" placeholder={this.state.sEmailPlaceholder} name="sEmail" autoComplete="true" onChange={this.handleChange} value={this.state.sEmail}/><span className="highlight" /><span className="bar" /></div>
            </form>
            <br />
            <button disabled={this.state.bEmailFieldsDisabled} className="btn btn-submit" type="submit" onClick={this.handleSubmit}>{this.state.sSubmitButtonText}</button>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
          <br/>
            <br/>
              <br/>
                <br/>
        
        
      </div>
    );
  }
  componentDidMount() {
    this.autoPressKeys();
  }
}

export default App;
