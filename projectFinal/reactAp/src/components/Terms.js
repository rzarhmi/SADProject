import React, {Component} from 'react'
import '../styles/user/home-page.css'
import {Link} from 'react-router-dom'
import NavBar from './navbar'

class Terms extends Component{


    navbarResponsive() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }


    render(){
        return(
            <div>
                <NavBar/>
                <br/>
                <br/>
                <br/>

                <div className="text-center" style={{width:"100%",textAlign:"left",backgroundColor:"cyan"}}>


                    <div className="row">
                        <div className="col-sm-8">
                            <blockquote>
                                <p>Here is a Summary of Pandora&#8217;s Terms of Use:</p>
                                <ul>
                                    <li>You must be at least 13 years old to open a Pandora account.</li>
                                    <li>Pandora can only be used in the United States, New Zealand, Australia and those countries&#8217; respective territories.</li>
                                    <li>You are solely responsible for protecting your own account password and other account information.</li>
                                    <li>Unless you have an active DMX Pandora for Business account, Pandora is for personal use only. That means you can&#8217;t play Pandora for the patrons in your bar, coffee shop, etc.</li>
                                    <li>You can&#8217;t use Pandora to steal music or other content, and you have to listen to it through pandora.com or on a device officially supported by Pandora.</li>
                                    <li>Do not use Pandora if you do not agree to the Terms of Use described below. Your use of Pandora means you agree to these Terms of Use.</li>
                                </ul>
                            </blockquote>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Terms

