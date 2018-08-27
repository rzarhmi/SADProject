/*    --------------------------- Comment Block ------------------------------------
      |  Component: Charge Credit
      |
      |  Purpose:  Component for displaying a form to admin, which it's purpose inspect
      |          submitting a charge request for system, this charge request is in RLS.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import '../../styles/employer/charge-credit.css'
import NavBar from '../../components/navbar'
import Parse from 'parse'
import {Link} from 'react-router-dom';

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
          our different queries based on employee's requests.
    */
  async getDataFromServer() {
    let Wallet = Parse.Object.extend("Wallet");
    let query = new Parse.Query("Wallet");
    query.equalTo("username", "company");
    let results = await query.find();
    let userRial = results[0].get("rial");
    this.setState({userRial: userRial})

  }
  /*    Function for handling employee's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */
  async handleCharge() {

    let amount = document.getElementById('amount').value;

    const Wallet = Parse.Object.extend("Wallet");
    let query = new Parse.Query(Wallet);
    query.equalTo("username", "company");
    let results = await query.find();
    let now = results[0].get("rial");
    now = parseInt(now);
    let chargeAmount = amount;
    amount = parseInt(amount);
    amount = now + amount;
    amount = amount.toString();
    results[0].set("rial", amount);
    results[0].save();

    const Transactions = Parse.Object.extend("Transactions");
    const transactions = new Transactions();
    let user = Parse.User.current();
    let userName = user.get("username");
    transactions.set("User", userName);
    transactions.set("Type", "Company Charge");
    transactions.set("Status", "Done");
    transactions.set("Amount", chargeAmount);
    transactions.save().then((transactions) => {
      // Execute any logic that should take place after the object is saved.
      alert("charged!")
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert("Transaction Failed" + error);
    });

  }
  /*    Render function of our Component to display required HTML code.
          This component is available in every component; it renders
          proper HTML code based on the component's state.
    */
  render() {
    return (<div>
      <NavBar/>
      <br/>
      <div className="container" style={{
          width: "80%"
        }}>
        <form action="action_page.php">
          <div className="row">
            <div className="col-25">
              <label for="card-number">Current Charge (Rls)</label>
            </div>
            <div className="col-75">
              <input type="text" id="current-charge" name="charge" placeholder={this.state.userRial} disabled="disabled"/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="card-number">Charge Amount (Rls)</label>
            </div>
            <div className="col-75">
              <input type="text" id="amount" name="charge" placeholder="0"/>
            </div>
          </div>
          <br/>
          <br/>
          <div className="row">
            <Link to={"/employer"}><input id="button" type="button" value="Charge" onClick={this.handleCharge}/></Link>
          </div>
        </form>
      </div>

    </div>)

  }
}

export default ChargeCredit
