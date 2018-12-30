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
import '../../styles/user/transaction-history.css'
import logo from '../../logo.png'
import toefl from '../../toefl.jpg'
import tef from '../../tef.png'
import gre from '../../gre.jpg'
import ielts from '../../ielts.jpg'
import dele from '../../dele.png'
import NavBar from '../../components/navbar'
import Parse from 'parse'

class TestList extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */
  constructor(props) {
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
    Parse.serverURL = 'http://localhost:8030/wp';
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      tests: [],
      userRial: []
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
    let Tests = Parse.Object.extend("Tests");
    let query = new Parse.Query(Tests)
    query.exists("Name");
    let results = await query.find();
    console.log(results)
    for (let i = 0; i < results.length; i++) {
      results[i] = [
        results[i].get('Name'),
        results[i].get('Description'),
        results[i].get('Cost'),
        results[i].get('Pic')
      ];
    }
    let user = Parse.User.current();
    let userName = user.get("username")
    query = new Parse.Query("Wallet")
    query.equalTo("username", userName);
    let result = await query.find();
    let userRial = result[0].get("rial");
    this.setState({tests: results, userRial: userRial})

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
  /*    Function for handling user's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */

  handleClick(e, i) {
    let sure = window.confirm("are you sure?!");
    if (sure){
        let name = document.getElementById(i).innerHTML;
        for (var i = 0; i < this.state.tests.length; i++) {
            let x = this.state.tests[i]
            let userRial = this.state.userRial
            let cost = parseInt(x[2])
            if (x[0] == name) {
                if (userRial > cost) {
                    const Transactions = Parse.Object.extend("Transactions");
                    const transactions = new Transactions();
                    let user = Parse.User.current();
                    let userName = user.get("username")
                    transactions.set("User", userName);
                    transactions.set("Type", "Test");
                    transactions.set("Status", "Pending");
                    transactions.set("Amount", cost.toString());
                    transactions.set("Test", name);
                    transactions.save().then((transactions) => {
                        // Execute any logic that should take place after the object is saved.
                        alert("Test Submitted");
                    }, (error) => {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert("Test Failed");
                    });
                } else {
                    alert('Not enough rial balance in your account')
                }
            }
        }

    }
    else {
      alert("Operation canceled")
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
                <th>Choose</th>

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
                  <td>
                    <button id={"confirm_test_register"} type="confirm" onClick={(e) => this.handleClick(e, i)}>Choose</button>
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

export default TestList
