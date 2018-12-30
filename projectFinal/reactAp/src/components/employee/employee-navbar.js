/*    --------------------------- Comment Block ------------------------------------
      |  Component: Employee Navigation Bar
      |
      |  Purpose:  Main component for displaying employees' navigation bar
      |         at homepage of account. This helps users to navigate through
      |         the application and enjoy our services.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from "../../actions/index";
import {bindActionCreators} from 'redux'
import Parse from 'parse'
import logo from '../../logo.png'

class EmployeeNavbar extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */
  constructor(props) {
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
      Parse.serverURL = 'http://localhost:8030/wp';
      this.getDataFromServer = this.getDataFromServer.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.state = {
      username: []
    };

  }
  componentDidMount() {
    this.getDataFromServer();
  }
  /*    Component's function, invoked after component's mounting,
          to fetch required data from the database, data needed for
          our different queries based on employee's requests.
    */
  async getDataFromServer() {
    let user = Parse.User.current();
    let name = user.get("username");
    this.setState({username: name});
  }
  /*    Function for handling employee's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */
  handleLogOut() {
    Parse.User.logOut();
    this.props.logOut();
  }

  navbarResponsive() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  render() {
    return (<header className="header" id="myHeader">
      <div>
        <nav className="topnav" id="myTopnav">
          <ul>
            <li>
              <div className="dropdown">
                <button className="dropbtn" style={{
                    fontStyle: "italic"
                  }}>
                  {this.state.username}
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link onClick={this.handleLogOut} to={"/"}>Log Out</Link>
                </div>
              </div>
            </li>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/employee/reqTransactions"} id={"check_requested_transactions"}>Check requested transactions</Link>
            </li>
            <li>
              <Link to={"/employee/transactions"}>previous transactions</Link>
            </li>
            {/* <li><Link to={"/employee/messages"}>messages</Link></li> */}
            <li>
              <a href="javascript:void(0);" className="icon" onClick={this.navbarResponsive}>
                <i className="fa fa-bars"></i>
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </header>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: bindActionCreators(logOut, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(EmployeeNavbar)
