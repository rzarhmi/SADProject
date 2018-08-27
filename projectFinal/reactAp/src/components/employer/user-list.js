/*    --------------------------- Comment Block ------------------------------------
      |  Component: List of Users
      |
      |  Purpose:  Component for displaying a list of available users
      |     Signed up in our application. Admin can choose one of them and
      |     discard them.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/employer/user-list.css'
import NavBar from '../../components/navbar'
import Parse from 'parse'

class UserList extends Component {
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
      users: []
    }
  }
  componentDidMount() {
    this.getDataFromServer();
  }
  /*    Component's function, invoked after component's mounting,
        to fetch required data from the database, data needed for
        our different queries based on employee's requests.
  */
  async getDataFromServer() {
    let query = new Parse.Query(Parse.User);
    query.notEqualTo("username", "admin");
    let results = await query.find();
    for (let i = 0; i < results.length; i++) {
      results[i] = [
        results[i].get("username"),
        results[i].createdAt,
        results[i].updatedAt,
        results[i].get("Type")
      ];
    }
    console.log(results);
    this.setState({users: results})

  }
  /*    Component's function, invoked after component's mounting,
        to fetch required data from the database, data needed for
        our different queries based on employee's requests.
  */

  async handleClick(e, i) {
    let name = document.getElementById(i).innerHTML;
    let query = new Parse.Query(Parse.User);
    query.equalTo("username", name);
    let results = await query.find();
    let obj = results[0];
    obj.destroy().then((myObject) => {
      // The object was deleted from the Parse Cloud.
      alert("user deleted!")
    }, (error) => {
      // The delete failed.
      // error is a Parse.Error with an error code and message.
      alert("there is an error: " + error);
    });

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
              }}>Users List</caption>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Created</th>
                <th>Last Activity</th>
                <th>Type</th>
                <th>Discard</th>

              </tr>
            </thead>
            <tbody>

              {
                this.state.users.map((value, i) => <tr key={i}>
                  <td>
                    <p id={i}>{value[0].toLocaleString()}</p>
                  </td>
                  <td>
                    <p>{value[1].toLocaleString()}</p>
                  </td>
                  <td>
                    <p>{value[2].toLocaleString()}</p>
                  </td>
                  <td>
                    <p>{value[3].toLocaleString()}</p>
                  </td>
                  <td>
                    <Link to="/employer"/><input type="submit" onClick={(e) => this.handleClick(e, i)} value="discard" style={{
                    backgroundColor: "firebrick"
                  }}/>
                  </td>
                </tr>)
              }

            </tbody>
          </table>
        </div>

      </div>

    </div>)
  }
}

export default UserList
