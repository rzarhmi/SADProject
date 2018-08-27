import React, {Component} from 'react'
import logo from './../../logo.png'
import '../../styles/user/contact-us.css'
import {Link} from 'react-router-dom'
import NavBar from '../../components/navbar'



class ContactUs extends Component {
    navbarResponsive() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }


    render() {
        return (
            <div>
                <NavBar/>
                <div className="headPic">
                </div>
                <br/>
                    <br/>
                        <br/>
                            <div className="messageContainer">
                                <form>
                                    <div className="row">
                                        <div className="col-25">
                                            <label for="note" style={{color: "#32a898", fontSize: "larger"}}> "Write your message here:"</label>
                                        </div>
                                        <br/>
                                            <div className="col-75">
                                                <textarea id="note" name="subject" placeholder="Write something.." style={{height: "200px"}}></textarea>
                                            </div>
                                    </div>
                                    <br/>
                                        <div className="row">
                                            <input type="submit" value="Send" id="submitForm" />
                                        </div>
                                </form>
                            </div>

            </div>
        )

    }
}

export default ContactUs