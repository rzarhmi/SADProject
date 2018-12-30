/*    --------------------------- Comment Block ------------------------------------
      |  Component: List of Employees
      |
      |  Purpose:  Component for displaying a list of available employees defined
      |     by admin. Admin can choose one of them and discard them or change
      |     their salary.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/employer/employee-list.css'
import NavBar from '../../components/navbar'
import Parse from 'parse'

class EmployeeList extends Component {
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
    query.equalTo("Type", "employee");
    let results = await query.find();

    for (let i = 0; i < results.length; i++) {
        let salary = Parse.Object.extend('Salary');
        query = new Parse.Query(salary);
        query.equalTo("username",results[i].get("username"))
        let resultss = await query.find()

      results[i] = [
        results[i].get("username"),
        results[i].createdAt,
        results[i].updatedAt,
        resultss[0].get("amount")
      ];
    }
    console.log(results);
    this.setState({users: results})

  }
  /*    Function for handling employee's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */
  async handleClick(e, i) {
    e.preventDefault();
    let name = document.getElementById(i).innerHTML;
    i = (i * 32) + 32;
    let salary = document.getElementById(i).value;
    console.log(i);
    console.log(salary);
    salary = parseInt(salary);
    let Salary = Parse.Object.extend("Salary");
    let query = new Parse.Query(Salary);
    query.equalTo("username", name);
    let results = await query.find();
    let obj = results[0];
    obj.set("amount", salary.toString());
    obj.save().then((object) => {
      // Execute any logic that should take place after the object is saved.
      alert('salary updated');
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
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
              }}>Employee List</caption>
            <thead>
              <tr>
                <th>Employee Username</th>
                <th>Created</th>
                <th>Last Activity</th>
                <th>Change Salary</th>
                <th>New Salary</th>
                <th>Current Salary (Rs)</th>
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
                  <td><Link to="/employer">
                    <buttion type="button" onClick={(e) => this.handleClick(e, i)}  style={{
                      backgroundColor: "blue", padding: "12px 20px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      color: 'white'
                  }}>Change</buttion>
                  </Link>
                  </td>
                  <td><input id={(i * 32) + 32} type="text" placeholder="new salary (Rial)"/></td>
                  <td>
                    <p>{value[3].toLocaleString()}</p>
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

export default EmployeeList;
