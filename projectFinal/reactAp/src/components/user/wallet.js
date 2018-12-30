/*    --------------------------- Comment Block ------------------------------------
      |  Component: Wallet
      |
      |  Purpose:  Component for displaying the user's wallet.
      |       this wallet shows balance of user's account in every
      |       availabe currencies of our site.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/user/wallet.css'
import NavBar from '../../components/navbar'
import Parse from "parse"

class Wallet extends Component {
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
      rial: [],
      euro: [],
      dollar: []
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
    var query = new Parse.Query("Wallet")
    let user = Parse.User.current();
    let userName = user.get("username")
    query.equalTo("username", userName);
    const results = await query.find();
    let userDollar = results[0].get("dollar");
    let userEuro = results[0].get("euro");
    let userRial = results[0].get("rial");

    this.setState({rial: userRial, euro: userEuro, dollar: userDollar})
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
              }}>My Wallet</caption>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Euro</td>
                <td>{this.state.euro}</td>
              </tr>
              <tr>
                <td>Dollar</td>
                <td>{this.state.dollar}</td>
              </tr>
              <tr>
                <td>Rial</td>
                <td>{this.state.rial}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>)
  }
}

export default Wallet
