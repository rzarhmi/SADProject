import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/employee/messages.css'
import NavBar from '../../components/navbar'

class Messages extends Component{

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
                <div className="content">

                    <div className="headPic">
                    </div>

                    <div className="table_container">
                        <table>
                            <caption style={{color: "white", paddingBottom: "20px"}}>Messages</caption>
                            <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Message</th>
                                <th>Response</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><a href="#" style={{color: "white"}}>Red Hat</a></td>
                                <td>06-07-2018</td>
                                <td>22:24</td>
                                <td>Yo dude, sup? just checking on you, happy confirming the hell out of customer. bye.</td>
                                <td><a href="#" style={{color: "white", fontStyle:"italic"}}> Responded</a></td>

                            </tr>
                            <tr>
                                <td><a href="#" style={{color: "white"}}>Reza Rahimi</a></td>
                                <td>08-05-2017</td>
                                <td>22:12</td>
                                <td>Come on bro, sup with my request pending for so long ? get to work bro</td>
                                <td><input type="submit" value="respond" id="respond1"/></td>
                            </tr>
                            <tr>
                                <td><a href="#" style={{color: "white"}}>Manager</a></td>
                                <td>04-02-2018</td>
                                <td>11:23</td>
                                <td>My Office, now!</td>
                                <td><input type="submit" value="respond"/></td>
                            </tr>
                            <tr>
                                <td><a href="#" style={{color: "white"}}>Azizam Bebakhshid</a></td>
                                <td>03-11-2017</td>
                                <td>15:47</td>
                                <td>Love your services, keep up the good work.</td>
                                <td><a href="#" style={{color: "white", fontStyle:"italic"}}> Responded</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>



                </div>


            </div>
        )
    }
}
export default Messages