/*    --------------------------- Comment Block ------------------------------------
      |  Component: User Convert Currency
      |
      |  Purpose:  Component for displaying a form, in which user can convert
      |           money from Rial to a destination currencies. This component
      |           will submit a transaction for employees, then they have to
      |           confirm/cancel it.
      |
      *-------------------------------------------------------------------*/

import React, {Component} from 'react'
import '../../styles/user/change-currency.css'
import Navbar from '../../components/navbar'
import Parse from 'parse'

class Transfer extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */
  constructor(props) {
    super(props);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
    Parse.serverURL = 'http://localhost:8030/wp';
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
    this.state = {
      userRial: [],
      dollar:[],
      euro:[]
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
    let Wallet = Parse.Object.extend("Wallet")
    let User = Parse.User.current()
    let userName = User.get("username")
    let query = new Parse.Query(Wallet)
    query.equalTo("username",userName)
    let results = await query.find()
    let userRial = results[0].get("rial")
    userRial = parseInt(userRial)

    let Currencies = Parse.Object.extend("Currencies");
    query = new Parse.Query(Currencies);
    query.equalTo("Name", "Euro");
    let euro = await query.find();
    query.equalTo("Name", "Dollar");
    let dollar = await query.find();
    euro = euro[0].get("Rials")
    euro = parseInt(euro)
    dollar = dollar[0].get("Rials")
    dollar = parseInt(dollar)
    this.setState({userRial:userRial,euro: euro, dollar: dollar})

  }
  /*    Function for handling user's request based on what
        button or request he/she has made. This function uses
        queries from the database, and our component's state to
        handle the request.
  */

  async handleConvert() {
    let destCurrValue = parseInt(document.getElementById('amount').value);
    let destCurr = document.getElementById("destcurr").value;
    let accNum = document.getElementById("acc-num").value;
    let userRial = this.state.userRial;
    userRial = parseInt(userRial)
    let euro = this.state.euro;
    let dollar = this.state.dollar;
    let User = Parse.User.current()
    let userName = User.get("username")

    if (destCurr == "Dollar") {
      let needed = destCurrValue * dollar;
      if (needed > userRial) {
        alert("Not enough balance")
      } else {
        const Transactions = Parse.Object.extend("Transactions");
        const transactions = new Transactions();
        // alert(userName)
        // alert(initCurrValue)
        // alert()
        transactions.set("User", userName);
        transactions.set("AccountNumber",accNum)
        transactions.set("Type", "Transfer");
        transactions.set("Status", "Pending");
        transactions.set("Amount", destCurrValue.toString());
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
    } else if (destCurr == "Euro") {
      let needed = destCurrValue * euro
      if (needed > userRial) {
        alert("Not enough balance")
      } else {
        const Transactions = Parse.Object.extend("Transactions");
        const transactions = new Transactions();
        // alert(userName)
        // alert(initCurrValue)
        // alert()
        transactions.set("User", userName);
        transactions.set("AccountNumber",accNum)
        transactions.set("Type", "Transfer");
        transactions.set("Status", "Pending");
        transactions.set("Amount", destCurrValue.toString());
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
  }

  /*    Render function of our Component to display required HTML code.
        This component is available in every component; it renders
        proper HTML code based on the component's state.
  */

  render() {
    return (<div class="content">
      <Navbar/>
      <div class="headPic"></div>
      <div class="table_container">

        <table style={{
            float: "right",
            minWith: "50%",
            padding: "10px"
          }}>
          <caption style={{
              backgroundColor: "#4CAF50",
              color: "white",
              paddingBottom: "20px"
            }}>Transfer Form</caption>
          <thead>
            <tr>
              <th>Destination Currency</th>
              <th>Amount</th>
              <th>Destination Account Number</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select id="destcurr">
                  <option value="Euro">Euro</option>
                  <option value="Dollar">Dollar</option>
                </select>
              </td>
              <td><input type='text' style={{
        maxWidth: "100px"
      }} id='amount'/></td>
                <td><input type='text' style={{
        maxWidth: "400px"
      }} id='acc-num'/></td>
                  <td>
                    <button id="submitForm" value="confirm" onClick={this.handleConvert} style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        float: "left"
                      }} type='submit'>Transfer</button>
                  </td>

                </tr>
              </tbody>
            </table>

          </div>

        </div>)
  }

}

export default Transfer
