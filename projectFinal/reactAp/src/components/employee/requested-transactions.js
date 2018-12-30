/*    --------------------------- Comment Block ------------------------------------
      |  Component: Requested Transactions
      |
      |  Purpose:  Component for the purpose of displaying history of
      |       all transactions made by users. This list of transactions
      |       contains all transactions with Pending status. The employee
      |       here can confirm or cancel the transactions.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/employee/requested-transactions.css'
import NavBar from '../../components/navbar'
import Parse from 'parse'

class RequestedTransactions extends Component {
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
            transactions: []
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
        const Transactions = Parse.Object.extend("Transactions");
        const query = new Parse.Query(Transactions);
        query.equalTo("Status", "Pending");
        const results = await query.find();
        for (var i = 0; i < results.length; i++) {
            results[i] = [
                results[i].get("Type"),
                results[i].id,
                results[i].get("User"),
                results[i].get("Test"),
                results[i].get("AccountNumber")

            ]
        }
        this.setState({transactions: results})
    }
    navbarResponsive() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    /*    Function for handling employee's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */

    async handleClick(e, i, action) {
        let id = document.getElementById("TransactionCode-" + i).innerHTML;
        let Transactions = Parse.Object.extend("Transactions");
        let query = new Parse.Query(Transactions);
        query.equalTo("objectId", id);
        let transaction = await query.find();
        let userName = transaction[0].get("User")

        if (action == "Confirm") {
            let transactionType = transaction[0].get("Type")
            let Wallet = Parse.Object.extend("Wallet");
            query = new Parse.Query(Wallet)
            query.equalTo("username", userName)
            let wallets = await query.find();
            let wallet = wallets[0]
            let currentMoney;
            let Notifications;
            let Notif;
            let sysWallet;
            let results;
            let sysWalletRial;
            let destCurrValue
            let destCurr
            let Currencies
            let rials
            switch (transactionType) {
                case "Test":
                    let cost = transaction[0].get('Amount')

                    cost = parseInt(cost)

                    currentMoney = parseInt(wallet.get("rial"))

                    currentMoney = currentMoney - cost

                    currentMoney = currentMoney.toString()

                    wallet.set("rial", currentMoney)
                    wallet.save();
                    transaction = transaction[0];
                    transaction.set("Status", "Confirmed");
                    transaction.save();

                    Notification = Parse.Object.extend("Notifications")
                    Notif = new Notification();
                    Notif.set("User", userName)
                    Notif.set("Text", "Test Added Successfully")
                    Notif.save()

                    sysWallet = Parse.Object.extend("Wallet");
                    query = new Parse.Query("Wallet");
                    query.equalTo("username", "company");
                    results = await query.find();
                    sysWallet = results[0];
                    sysWalletRial = sysWallet.get("rial");
                    sysWalletRial = parseInt(sysWalletRial) + parseInt(cost)
                    sysWalletRial = sysWalletRial.toString();
                    sysWallet.set("rial", sysWalletRial)
                    sysWallet.save().then((sysWallet) => {
                        // Execute any logic that should take place after the object is saved.
                        alert("Commission added to Company wallet");
                    }, (error) => {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                    });

                    alert("Test Added to User Successfully");
                    break;

                case "Charge":
                    let charge = transaction[0].get('Amount')

                    charge = parseInt(charge)

                    currentMoney = parseInt(wallet.get("rial"))

                    currentMoney = currentMoney + charge;

                    currentMoney = currentMoney.toString();

                    wallet.set("rial", currentMoney)
                    wallet.save();
                    transaction = transaction[0];
                    transaction.set("Status", "Confirmed");
                    transaction.save();
                    Notification = Parse.Object.extend("Notifications")
                    Notif = new Notification();
                    Notif.set("User", userName)
                    Notif.set("Text", "Account Charged Successfully")
                    Notif.save()

                    sysWallet = Parse.Object.extend("Wallet");
                    let query = new Parse.Query("Wallet");
                    query.equalTo("username", "company");
                    results = await query.find();
                    sysWallet = results[0];
                    sysWalletRial = sysWallet.get("rial");
                    let commision = charge / 9;
                    commision = parseInt(commision);
                    sysWalletRial = parseInt(sysWalletRial) + parseInt(commision)
                    sysWalletRial = sysWalletRial.toString();
                    sysWallet.set("rial", sysWalletRial)
                    sysWallet.save().then((sysWallet) => {
                        // Execute any logic that should take place after the object is saved.
                        alert("Commission added to Company wallet");
                    }, (error) => {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                    });

                    alert("User account charged Successfully");
                    break;
                case "Convert":
                    destCurrValue = transaction[0].get('Amount')
                    destCurr = transaction[0].get('DestCurr')
                    Currencies = Parse.Object.extend("Currencies")
                    query = new Parse.Query(Currencies)
                    query.equalTo("Name", destCurr)
                    rials = await query.find()
                    rials = rials[0].get("Rials")

                    rials = parseInt(rials) * parseInt(destCurrValue)

                    currentMoney = parseInt(wallet.get("rial"))

                    currentMoney = currentMoney - rials

                    currentMoney = currentMoney.toString()

                    if (destCurr = 'Dollar') {
                        let currentCurrency = wallet.get('dollar')
                        currentCurrency = parseInt(currentCurrency) + parseInt(destCurrValue)
                        wallet.set('dollar', currentCurrency.toString())
                    } else if (destCurr = 'Euro') {
                        let currentCurrency = wallet.get('euro');
                        currentCurrency = parseInt(currentCurrency) + parseInt(destCurrValue);
                        wallet.set('euro', currentCurrency.toString());
                    }
                    wallet.set("rial", currentMoney)
                    wallet.save();
                    transaction = transaction[0];
                    transaction.set("Status", "Confirmed");
                    transaction.save();
                    Notification = Parse.Object.extend("Notifications")
                    Notif = new Notification();
                    Notif.set("User", userName)
                    Notif.set("Text", "Conversion Done Successfully")
                    Notif.save()
                    alert("Done");
                    break;

                case "Transfer":
                    destCurrValue = transaction[0].get('Amount');
                    destCurr = transaction[0].get('DestCurr');
                    Currencies = Parse.Object.extend("Currencies");
                    query = new Parse.Query(Currencies);
                    query.equalTo("Name", destCurr);
                    rials = await query.find();
                    rials = rials[0].get("Rials");

                    rials = parseInt(rials) * parseInt(destCurrValue)

                    currentMoney = parseInt(wallet.get("rial"))

                    currentMoney = currentMoney - rials

                    currentMoney = currentMoney.toString()

                    if (destCurr = 'Dollar') {
                        let currentCurrency = wallet.get('dollar')
                        currentCurrency = parseInt(currentCurrency) + parseInt(destCurrValue)
                        wallet.set('dollar', currentCurrency.toString())
                    } else if (destCurr = 'Euro') {
                        let currentCurrency = wallet.get('euro');
                        currentCurrency = parseInt(currentCurrency) + parseInt(destCurrValue);
                        wallet.set('euro', currentCurrency.toString());
                    }
                    wallet.set("rial", currentMoney)
                    wallet.save();
                    transaction = transaction[0];
                    transaction.set("Status", "Confirmed");
                    transaction.save();
                    Notification = Parse.Object.extend("Notifications")
                    Notif = new Notification();
                    Notif.set("User", userName)
                    Notif.set("Text", "Transfer Done Successfully")
                    Notif.save()
                    alert("Done");
            }
        } else {
            transaction[0].set("Status", "Canceled")
            transaction[0].save();
            alert("Transaction Cancelled")
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
                }}>Pending Requests</caption>
                <thead>
                <tr>
                  <th>Transaction Type</th>
                  <th>Transaction Code</th>
                  <th>Requested User</th>
                  <th>Test</th>
                  <th>Account Number</th>
                  <th>Confirm</th>
                  <th>Cancel</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.transactions.map((value, i) => <tr key={i}>
                      <td>{value[0]}</td>
                      <td id={"TransactionCode-" + i}>{value[1]}</td>
                      <td>{value[2]}</td>
                      <td>{value[3]}</td>
                      <td>{value[4]}</td>
                      <td>
                        <Link to="/employee">
                          <button id={"button_confirm_"+i} type="button" style={{
                              backgroundColor: "Green",
                              color: "white",
                              padding: "12px 20px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              float: "left"
                          }} onClick={(e) => this.handleClick(e, i, "Confirm")}>Confirm</button>
                        </Link>
                      </td>
                      <td>
                        <Link to="/employee">
                          <buttion id={"button_cancel_"+i} type="button" style={{
                              backgroundColor: "Red",
                              color: "white",
                              padding: "12px 20px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              float: "left"
                          }} onClick={(e) => this.handleClick(e, i, "Cancel")}>Cancel</buttion>
                        </Link>
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

export default RequestedTransactions
