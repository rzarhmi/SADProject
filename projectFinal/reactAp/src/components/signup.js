import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {logIn} from "../actions/index";
import './signin.css'
import Parse from 'parse'

class SignUp extends Component {
  constructor(props){
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
    Parse.serverURL = 'http://localhost:8030/wp';
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  async handleSignUp(){
    Parse.User.logOut();
    let values = document.getElementById("signup-form").elements;
    let user = new Parse.User();

    user.set("username", values[0].value);
    user.set("password", values[2].value);
    user.set("email", values[1].value);
    user.set("Type", "user");

    var userACL = new Parse.ACL(Parse.User.current());
    userACL.setPublicWriteAccess(true);
    userACL.setPublicReadAccess(true);
    user.setACL(userACL);

    try {
      await user.signUp();

        const Wallet = Parse.Object.extend("Wallet");
        let wallet = new Wallet();

        wallet.set("username",  values[0].value);
        wallet.set("rial", "0");
        wallet.set("dollar", "0");
        wallet.set("euro","0");

        wallet.save()
            .then((wallet) => {
                // Execute any logic that should take place after the object is saved.
                alert("register success!");
            }, (error) => {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            });



      this.props.logIn('user');
      // Hooray! Let them use the app now.
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  }
  render() {
    return (<div className={"signin-holder"}>
      <form id='signup-form'>
        <h1>Sign Up</h1>

          <legend>
            <span className="number">&#9386</span>Please fill out the form</legend>
          <label htmlFor="name">Username: (no upper case letters)</label>
          <input type="text" id="name" name="user_name" pattern="[a-z0-9]{6,25}"/>

          <label htmlFor="mail">Email:</label>
          <input type="email" id="mail" name="user_email"/>

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="user_password"/>

          <label>Agree to
            <a href="url">Site's Terms And Conditions</a>:</label>
          <input type="checkbox" id="under_13" value="Terms" name="Terms"/>
          <label htmlFor="under_13" className="light">I agree</label><br/>

          <Link onClick={this.handleSignUp} to={"/user"}><button id="signupButton" type="submit">
          Sign Up
        </button></Link>
      </form>
    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: bindActionCreators(logIn, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
