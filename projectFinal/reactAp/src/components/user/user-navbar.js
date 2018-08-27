/*    --------------------------- Comment Block ------------------------------------
      |  Component: User Navigation Bar
      |
      |  Purpose:  Main component for displaying users' navigation bar
      |         at homepage of account. This helps users to navigate through
      |         the application and enjoy our services.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from "../../actions/index";
import {bindActionCreators} from 'redux'
import logo from '../../logo.png'
import Parse from 'parse'

class UserNavBar extends Component {
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
            our different queries based on user's requests.
      */
    async getDataFromServer() {
        let user = Parse.User.current();
        let name = user.get("username");
        this.setState({username: name});
    }
    /*    Function for handling user's request based on what
            button or request he/she has made. This function uses
            queries from the database, and our component's state to
            handle the request.
      */
    handleLogOut() {
        Parse.User.logOut();
        this.props.logOut();
    }
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
        if (!this.state.username) {
            return (<p>waiting for response</p>)
        } else {
            return (<header className="header" id="myHeader">
              <div id="myContainer">
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
                          <Link to={"/user/myTransactions"}>My Transactions</Link>
                          <Link to={"/user/wallet"}>My Wallet</Link>
                          <Link to={"/user/profile"}>View Profile</Link>
                          <Link to={"/user/profileedit"}>Edit Profile</Link>
                          <Link to={"/user/contactUs"}>Contact Us</Link>
                          <Link onClick={this.handleLogOut} to={"/"}>Log Out</Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/user/convertCurrency"}>convert currencies</Link>
                    </li>
                    <li>
                      <Link to={"/user/chargeCredit"}>Charge Credit</Link>
                    </li>
                    <li>
                      <Link to={"/user/tests"}>register for a test</Link>
                    </li>
                    <li>
                      <Link to="/user/notifications">notifications</Link>
                    </li>
                    <li>
                      <Link to="/user/transfer">Transfer</Link>
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
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: bindActionCreators(logOut, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(UserNavBar)
