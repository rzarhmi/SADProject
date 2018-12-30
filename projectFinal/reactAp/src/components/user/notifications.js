/*    --------------------------- Comment Block ------------------------------------
      |  Component: Notifications
      |
      |  Purpose:  Component for displaying notifications and messeges.
      |     this messeges can be specific to an user or it could have been sent
      |     by admin,
      |
      *-------------------------------------------------------------------*/

import React, {Component} from 'react';
import logo from './../../logo.png'
import '../../styles/user/notifications.css'
import {Link} from 'react-router-dom'
import NavBar from '../../components/navbar'
import Parse from 'parse'

class Notifications extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */
  constructor(props) {
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
      Parse.serverURL = 'http://localhost:8030/wp';
      this.getDataFromServer = this.getDataFromServer.bind(this);
    this.state = {
      notifications: []
    }
  }
  componentDidMount() {
    this.getDataFromServer();
  }
  /*    Component's function, invoked after component's mounting,
        to fetch required data from the database, data needed for
        our different queries based on user's requests.
  */

  async getDataFromServer() {
    let User = Parse.User.current();
    let userName = User.get("username")
    let query1 = new Parse.Query("Notifications");
    query1.equalTo("User", userName)

    let query2 = new Parse.Query("Notifications");
    query2.equalTo("User", "all")

    let query = Parse.Query.or(query1, query2)
    const results = await query.find();
    for (var i = 0; i < results.length; i++) {
      results[i] = results[i].get('Text');
    }
    this.setState({notifications: results})
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
    return (<div>
      <NavBar/>
      <div className="content">

        <div className="headPic"></div>

        <div className="table_container">
          <table>
            <caption style={{
                color: "white",
                paddingBottom: "20px"
              }}>Notifications</caption>
            <tbody>
              {/* {this.state.notifications} */}
              {
                this.state.notifications.map((value, i) => <tr key={i}>
                  <td>{value}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>)
  }
}
export default Notifications
