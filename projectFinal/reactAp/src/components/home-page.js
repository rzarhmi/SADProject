/*    --------------------------- Comment Block ------------------------------------
      |  Component: Home Page
      |
      |  Purpose:  Our website main homepage, containing navbar, commision rate
      |      button, online currencies, ... . this page will help you navigate
      |       to different services that our app provides.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import logo from '../logo.png'
import '../styles/user/home-page.css'
import {Link} from 'react-router-dom'
import NavBar from './navbar'

class HomePage extends Component{

    //function for handling responsive feature of our pages
    navbarResponsive() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    //render function of our Component to display required html code.
    render(){
        return(
            <div>
                <NavBar/>

                <div className="content">

                    <div className="headPic">
                    </div>

                    <div className="buttons">

                        <div id="commisiionRate">
                            <p className="rounded">
                                <Link to="/commision"><button className="buttonOut" id="button1"><span></span> COMMISION RATE <span></span></button></Link>
                            </p>
                        </div>

                        <div id="convertCurrency">
                            <p className="rounded">
                                <Link to="/converttest"><button className="buttonOut" id="button2"><span></span> CONVERT CURRENCIES <span></span></button></Link>
                            </p>
                        </div>

                        <div id="laws">
                            <p className="rounded">
                                <Link to="/terms"><button className="buttonOut" id="button3"><span></span> LAWS and TERMS<span></span></button></Link>
                            </p>
                        </div>

                        <div id="currencyWorth">
                            <p className="rounded">
                                <Link to="/onlinecurrency"><button className="buttonOut" id="button4"><span></span> ONLINE CURRENCY RATE<span></span></button></Link>
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default HomePage
