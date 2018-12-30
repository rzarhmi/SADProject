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

class ChangeCurrency extends Component {
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
      euro: [],
      dollar: [],
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
    const Currencies = Parse.Object.extend("Currencies");
    let query = new Parse.Query(Currencies);
    query.equalTo("Name", "Euro");
    let euro = await query.find();
    query.equalTo("Name", "Dollar");
    let dollar = await query.find();
    euro = [
      euro[0].get("Rials"),
      euro[0].updatedAt.toLocaleDateString()
    ];
    dollar = [
      dollar[0].get("Rials"),
      dollar[0].updatedAt.toLocaleDateString()
    ];

    this.setState({euro: euro, dollar: dollar})
  }

    /*    Function for handling user's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request. */

  async handleConvert() {
    let initCurrValue = parseInt(document.getElementById('destcurr-value').value);
    let destCurr = document.getElementById("destcurr").value;
    const Wallet = Parse.Object.extend("Wallet");
    let query = new Parse.Query(Wallet);
    let User = Parse.User.current();
    let userName = User.get("username")
    query.equalTo("username", userName)
    let user = await query.find();
    let userRial = user[0].get("rial")
    userRial = parseInt(userRial)

    if (destCurr == "Dollar") {
      let dollar = parseInt(this.state.dollar)
      let needed = initCurrValue * dollar
      if (needed > userRial) {
        alert("Not enough balance")
      } else {
        const Transactions = Parse.Object.extend("Transactions");
        const transactions = new Transactions();
        // alert(userName)
        // alert(initCurrValue)
        // alert()
        transactions.set("User", userName);
        transactions.set("Type", "Convert");
        transactions.set("Status", "Pending");
        transactions.set("Amount", initCurrValue.toString());
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
      let euro = parseInt(this.state.euro)
      let needed = initCurrValue * euro
      if (needed > userRial) {
        alert("Not enough balance")
      } else {
        const Transactions = Parse.Object.extend("Transactions");
        const transactions = new Transactions();
        // alert(userName)
        // alert(initCurrValue)
        // alert()
        transactions.set("User", userName);
        transactions.set("Type", "Convert");
        transactions.set("Status", "Pending");
        transactions.set("Amount", initCurrValue.toString());
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
    return (<div className="content">
      <Navbar/>
      <div className="headPic"></div>
      <div className="table_container">
        <table style={{
            float: "left",
            minWidth: "50%"
          }}>
          <caption style={{
              color: "white",
              paddingBottom: "20px"
            }}>Rate of Currency</caption>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rials</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Euro</td>
              <td>{this.state.euro[0]}</td>
              <td>{this.state.euro[1]}</td>
            </tr>
            <tr>
              <td>Dollar</td>
              <td>{this.state.dollar[0]}</td>
              <td>{this.state.dollar[1]}</td>
            </tr>
          </tbody>
        </table>
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
              <th>Change From</th>
              <th>Amount</th>
              <th>Change To</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select id="initcurr">
                  <option value="Rial">Rial</option>
                </select>
              </td>
              <td><input type='text' style={{
        maxWidth: "100px"
      }} id='destcurr-value'/></td>
              <td>
                <select id="destcurr">
                  <option value="Dollar">Dollar</option>
                  <option value="Euro">Euro</option>
                </select>
              </td>
              <td>
                <button id="submitForm" value="confirm" onClick={this.handleConvert} style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    float: "left"
                  }} type='submit'>Convert</button>
              </td>

            </tr>
          </tbody>
        </table>

      </div>

    </div>)
  }

}

export default ChangeCurrency
