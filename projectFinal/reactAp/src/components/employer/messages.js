import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.png'
import '../../styles/employer/messages.css'
import NavBar from '../../components/navbar'
import Parse from 'parse'


class Messages extends Component{

    constructor(props) {
        super(props);
        Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
        Parse.serverURL = 'http://localhost:8030/wp';
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.state = {
            warnings: []
        }
    }
    componentDidMount(){
        this.getDataFromServer();
    }

    async getDataFromServer() {
        const warning = Parse.Object.extend("Warnings");
        let query = new Parse.Query(warning);
        let results = await query.find();
        for (let i = 0; i < results.length; i++) {
            results[i]=[results[i].get("myId"),results[i].get("messege")];
        }

        this.setState(
            {warnings:results}
        )

    }

    async handleClick(e,i){
        let name = document.getElementById(i).innerHTML;
        let warning = Parse.Object.extend("Warnings");
        alert(name);
        let query = new Parse.Query(warning);
        query.equalTo("myId",name);
        let results = await query.first();
        results.destroy().then((myObject) => {
            // The object was deleted from the Parse Cloud.
            alert("messege deleted!")
        }, (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            alert("there is an error: " + error);
        });

    }



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
                                                        <caption style={{color:"white", paddingBottom:"20px"}}>Warnings</caption>
                                                        <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Description & Date</th>
                                                            {/*<th>Discard</th>*/}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.warnings.map(
                                                            (value, i) =>
                                                                <tr key={i}>
                                                                    <td><p id={i}>{value[0].toString()}</p></td>
                                                                    <td><p>{value[1].toString()}</p></td>
                                                                    {/*<td>*/}
                                                                        {/*<Link to="/employer"/><input type="submit" onClick={(e) => this.handleClick(e,i)} value="discard" style={{backgroundColor: "firebrick"}}/>*/}
                                                                    {/*</td>*/}
                                                                </tr>)
                                                        }


                                                        </tbody>
                                                    </table>
                    </div>



                </div>
            </div>
        )

    }
}
export default Messages