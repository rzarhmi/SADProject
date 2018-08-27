/*    --------------------------- Comment Block ------------------------------------
      |  Component: User Navigation Bar
      |
      |  Purpose:  Main component for displaying employer's navigation bar
      |         at homepage of account. This helps employer to navigate through
      |         the application and enjoy our services.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from "../../actions/index";
import {bindActionCreators} from 'redux'
import logo from '../../logo.png'

class EmployerNavBar extends Component {

  /*    This function helps us to make our Navigation Bar responsive to
        changes of width when the user resizes the browser.
  */
  navbarResponsive() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  /*    Render function of our Component to display required HTML code.
          This component is available in every component; it renders
          proper HTML code based on the component's state.
    */

  render() {
    return (<header className="header" id="myHeader">
      <div>
        <nav className="topnav" id="myTopnav">
          <ul>
            <li>
              <div className="dropdown">
                <button className="dropbtn">
                  Handle people
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={"/employer/usersList"}>Users List</Link>
                  <Link to={"/employer/employeeList"}>Employee List</Link>
                  <Link to={"/employer/addEmployee"}>Add employee</Link>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn">
                  tests
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={"/employer/tests"}>current tests</Link>
                  <Link to={"/employer/addTest"}>add tests</Link>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn">
                  transactions
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={"/employer/userTransactions"}>user transactions</Link>
                  <Link to={"/employer/myTransactions"}>my transactions</Link>

                </div>
              </div>
            </li>
            <li></li>
            <li>
              <Link to={"/employer/charge"}>charge credit</Link>
            </li>
            <li>
              <Link to={"/employer/messages"}>messages</Link>
            </li>
            <li></li>
            <li></li>
            <li onClick={() => this.props.logOut()}>
              <Link to={"/"}>Log Out</Link>
            </li>

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

export default connect(null, mapDispatchToProps)(EmployerNavBar)
