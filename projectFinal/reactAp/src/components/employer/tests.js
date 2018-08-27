/*    --------------------------- Comment Block ------------------------------------
      |  Component: List of Tests
      |
      |  Purpose:  Component for displaying a list of available tests defined
      |     by admin. User can choose one of them and a transaction of Test-type
      |     will be added to transactions table.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/employer/tests.css'
import NavBar from '../../components/navbar'
import Parse from 'parse'

class Tests extends Component {
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
      tests: []
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
    let Tests = Parse.Object.extend("Tests");
    let query = new Parse.Query("Tests")
    query.exists("Name");
    var results = await query.find();
    for (var i = 0; i < results.length; i++) {
      results[i] = [
        results[i].get('Name'),
        results[i].get('Description'),
        results[i].get('Cost'),
        results[i].get('Pic')
      ];
    }
    this.setState({tests: results})

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
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Pic</th>

              </tr>
            </thead>
            <tbody>
              {
                this.state.tests.map((value, i) => <tr key={i}>
                  <td>
                    <p id={i}>{value[0]}</p>
                  </td>
                  <td>
                    <p>{value[1]}</p>
                  </td>
                  <td>
                    <p>{value[2]}</p>
                  </td>
                  <td>
                    <img style={{
                        width: '200px'
                      }} src={value[3].url()}/>
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

export default Tests
