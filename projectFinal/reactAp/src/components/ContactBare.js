/*    --------------------------- Comment Block ------------------------------------
      |  Component: Contact Us
      |
      |  Purpose:  Component for displaying a simple html, reperesenting
      |      our contact information including: Emails, Addresses, Telephones, ...
      |      for better ways to contact with our organization, you should log in.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import '../styles/user/home-page.css'
import {Link} from 'react-router-dom'
import NavBar from './navbar'

class ContactBare extends Component {
  //  This function will help us to make our navbar responsive to changes of width,
  //  which can be mad by changing browser's size.
  navbarResponsive() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  //  render function of our Component to display required html code. This component
  //  is available in every component, it will render proper html code based on
  //  component's state.
  render() {
    return (<div>
      <NavBar/>
      <br/>
      <br/>
      <br/>

      <div className="text-center" style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "cyan"
        }}>
        <div className="row">
          <h2 className="mt-4">Contact Us</h2>
          <address>
            <strong>Start Bootstrap</strong>
            <br/>3481 Melrose Place
            <br/>Beverly Hills, CA 90210
            <br/>
          </address>
          <address>
            <abbr title="Phone">Phone:</abbr>
            (123) 456-7890
            <br/>
            <abbr title="Email">Email:</abbr>
            <a>name@example.com</a>
          </address>
        </div>
      </div>
    </div>)
  }
}

export default ContactBare
