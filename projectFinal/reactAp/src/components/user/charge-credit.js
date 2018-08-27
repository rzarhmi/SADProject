/*    --------------------------- Comment Block ------------------------------------
      |  Component: Charge Credit
      |
      |  Purpose:  Component for displaying a form to user, which it's purpose inspect
      |          submitting a charge request for user, this charge request is in RLS.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/user/wallet.css'
import NavBar from '../../components/navbar'
import Parse from "parse"

class ChargeCredit extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */
  constructor(props) {
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
    Parse.serverURL = 'http://localhost:8030/wp';
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.handleCharge = this.handleCharge.bind(this);
    this.state = {
      userRial: [],
      currentDollar: [],
      currentEuro: []
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
    let Wallet = Parse.Object.extend("Wallet");
    let query = new Parse.Query("Wallet")
    let user = Parse.User.current();
    let userName = user.get("username")
    query.equalTo("username", userName);
    let results = await query.find();
    let userRial = results[0].get("rial");
    let Currencies = Parse.Object.extend("Currencies");
    query = new Parse.Query("Currencies");
    query.equalTo("Name", "Dollar");
    results = await query.find();
    let currentDollar = results[0].get("Rials");
    query.equalTo("Name", "Euro");
    results = await query.find();
    let currentEuro = results[0].get("Rials");
    this.setState({userRial: userRial, currentEuro: currentEuro, currentDollar: currentDollar})

  }
  /*    Function for handling user's request based on what
        button or request he/she has made. This function uses
        queries from the database, and our component's state to
        handle the request.
  */
  async handleCharge() {

    let amount = document.getElementById('amount').value
    amount = parseInt(amount)
    let destCurr = document.getElementById('destcurr').value;

    if (amount < 1000) {
      alert('Less Than Minimum!')
    }
    else {
      amount = amount * 0.9;
      amount = parseInt(amount)
      amount = amount.toString()
      const Transactions = Parse.Object.extend("Transactions");
      const transactions = new Transactions();
      let user = Parse.User.current();
      let userName = user.get("username")
      transactions.set("User", userName);
      transactions.set("Type", "Charge");
      transactions.set("Status", "Pending");
      transactions.set("Amount", amount);
      transactions.set("DestCurr", destCurr);

      transactions.save().then((transactions) => {
        // Execute any logic that should take place after the object is saved.


        alert("Transaction Submitted");
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert("Transaction Failed");
      });

    }

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
  return (<div className="content">
    <NavBar/>
    <div className="headPic"></div>
    <div className="table_container">

      <table style={{
          float: "right",
          minWith: "50%",
          padding: "10px"
        }}>
        <caption style={{
            backgroundColor: "#4CAF50",
            color: "white",
            paddingBottom: "20px"
          }}>Change Form</caption>
        <thead>
          <tr>
            <th>Rial Balance</th>
            <th>Change To</th>
            <th>Amount</th>
            <th>Charge</th>
            <th>Commission</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.state.userRial}</td>
            <td>
              <select id="destcurr">
                {/* <option value="Dollar">Dollar</option>
                  <option value="Euro">Euro</option> */
                }
                <option value="Rial">Rial</option>
              </select>
            </td>
            <td>
              <input type='text' style={{
                  maxWidth: "100px"
                }} id='amount'/></td>
            <td>
              <button id="submitForm" value="confirm" onClick={this.handleCharge} style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  float: "left"
                }} type='submit'>Convert</button>
            </td>
            <td>
              <p>1%</p>
            </td>

          </tr>
        </tbody>
      </table>

    </div>

  </div>)
}
}

export default ChargeCredit
