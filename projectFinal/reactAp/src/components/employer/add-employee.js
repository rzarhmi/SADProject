/*    --------------------------- Comment Block ------------------------------------
      |  Component: Add Employee
      |
      |  Purpose:  Component for displaying a form, where the system's Admin
      |           can define new employees for the system. After submitting
      |             new employees can login to system.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import '../../styles/employer/add-employee.css'
import NavBar from '../../components/navbar'
import Parse from 'parse'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from "../../actions/index";
import {bindActionCreators} from 'redux'

class AddEmployee extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */

  constructor(props) {
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
    Parse.serverURL = 'http://localhost:8030/wp';
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  /*    Function for handling employee's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */
  async handleSignUp() {
    Parse.User.logOut();
    let values = document.getElementById("signup-form").elements;
    let user = new Parse.User();
    let value3;
    if (values[3].value){
      value3 = values[3].value
    } else {
      value3 = "0"
    }
    user.set("username", values[0].value);
    user.set("password", values[1].value);
    user.set("email", values[2].value);
    user.set("salary", parseInt(value3));
    user.set("Type", "employee");

    // var userACL = new Parse.ACL(Parse.User.current());
    // userACL.setPublicWriteAccess(true);
    // userACL.setPublicReadAccess(true);
    // user.setACL(userACL);

    user.signUp().then((user) => {
      // Execute any logic that should take place after the object is saved.
      alert('New object created with objectId: ' + user.id);
      Parse.User.logOut();
      this.props.logOut();
      window.location.replace("http://localhost:3000/");
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    });
  }
  /*    Render function of our Component to display required HTML code.
          This component is available in every component; it renders
          proper HTML code based on the component's state.
    */

  render() {
    return (<div>
      <NavBar/>
      <br/>
      <br/>
      <div className="container" style={{
          width: "80%"
        }}>
        <form id="signup-form" action="action_page.php">
          <div className="row">
            <div className="col-25">
              <label for="card-number">Employee Username</label>
            </div>
            <div className="col-75">
              <input type="text" id="current-charge" name="charge"/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="card-number">Password</label>
            </div>
            <div className="col-75">
              <input type="text" id="charge-amount" name="charge" placeholder="password"/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="card-number">Email</label>
            </div>
            <div className="col-75">
              <input type="text" id="charge-amount" name="charge" placeholder="xxx@yahoo.com"/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="card-number">Monthly Wage (Rls)</label>
            </div>
            <div className="col-75">
              <input type="text" id="charge-amount" name="charge" placeholder="0"/>
            </div>
          </div>

          <br/>
          <br/>
          <br/>
          <div className="row">
            <input id="button" type="button" onClick={this.handleSignUp} value="add"/>
          </div>
        </form>
      </div>

    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: bindActionCreators(logOut, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(AddEmployee)
