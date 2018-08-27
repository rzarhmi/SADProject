/*    --------------------------- Comment Block ------------------------------------
      |  Component: Logged Out Navbar
      |
      |  Purpose:  Generate a dynamic table by reading all available
      |      tests in our database, all tests are defined by admin.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.png'



class LoggedOutNavBar extends Component{
    navbarResponsive() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    render(){
        return (
            <header className="header" id="myHeader">
                <div>
                    <nav className="topnav" id="myTopnav">
                        <ul>
                            <li><Link to="/" style={{color: "white"}}>Home</Link> </li>
                            <li><Link to="/contactbare">contact us</Link> </li>
                            <li><Link to="/aboutus">About us</Link> </li>
                            <li><a href="#"></a> </li>
                            <li><a href="#"></a> </li>
                            <li><a href="#"></a> </li>
                            <li><a href="#"></a> </li>
                            <li><Link to={"/signup"}>Sign Up</Link> </li>
                            <li><Link to={"/signin"}>Sign In</Link> </li>

                            <li><a href="javascript:void(0);" className="icon" onClick={this.navbarResponsive}>
                                <i className="fa fa-bars"></i>
                            </a></li>
                        </ul>
                    </nav>


                </div>
            </header>
        )
    }
}

export default LoggedOutNavBar;
