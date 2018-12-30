/*----------------------------------------------------------------------------
         |  Component Login Employee
         |
         |  Purpose:  Display sign in form, for employer to login.
         |          This Url is hidden for normal users.
         |
         |
         *-------------------------------------------------------------------*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {logIn} from "../../actions/index";
import '../signin.css'
import Parse from 'parse'

class loginAdmin extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */
  constructor(props) {
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
      Parse.serverURL = 'http://localhost:8030/wp';
      this.handleSignIn = this.handleSignIn.bind(this);
  }
  /*    Function for handling employee's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */
  async handleSignIn() {
    let values = document.getElementById("signin-form").elements;

    const user = await Parse.User.logIn(values[0].value, values[1].value);
    this.props.logIn('employer');
  }
  /*    Render function of our Component to display required HTML code.
          This component is available in every component; it renders
          proper HTML code based on the component's state.
    */
  render() {
    return (<div className={"signin-holder"}>
      <form id='signin-form'>
        <h1>Sign In</h1>

        <legend>
          <span className="number">!</span>Please fill out the form</legend>
        <label htmlFor="name">Username: (no upper case letters)</label>
        <input type="text" id="name" name="user_name" pattern="[a-z0-9]{6,25}"/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="user_password"/>

        <Link onClick={this.handleSignIn} to={"/employer"}>
          <button id="signupButton" type="submit">
            Sign In
          </button>
        </Link>
      </form>
    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: bindActionCreators(logIn, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(loginAdmin)
