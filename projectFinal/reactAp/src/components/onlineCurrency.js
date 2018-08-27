        /*------------------------------------------------- Online Currency component -----
         |  Component Online Currency
         |
         |  Purpose:  Generate a dynamic table, by reading current rate of
         |      currencies, in our database.
         |
         *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import '../styles/user/change-currency.css'
import Navbar from '../components/navbar'
import Parse from 'parse'


class ChangeCurrency extends Component{
    constructor(props){
        super(props);
        Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
        Parse.serverURL = 'http://localhost:8030/wp';
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.state={
            euro:[],
            dollar:[]
        }
    }
    componentDidMount(){
        this.getDataFromServer();
    }

    async getDataFromServer(){
        const Currencies = Parse.Object.extend("Currencies");
        let query = new Parse.Query(Currencies);
        query.equalTo("Name","Euro");
        let euro = await query.find();
        query.equalTo("Name","Dollar");
        let dollar = await query.find();
        euro = [euro[0].get("Rials"),euro[0].updatedAt.toLocaleDateString()];
        dollar = [dollar[0].get("Rials"),dollar[0].updatedAt.toLocaleDateString()];


        this.setState(
            {euro:euro,
                dollar:dollar,
                output:"0"}
        )
    }



    render(){
        return(
            <div class="content">
                <Navbar/>
                <div class="headPic">
                </div>
                <div class="table_container">
                    <table style={{float:"left",minWidth: "50%"}}>
                        <caption style={{color: "white", paddingBottom: "20px"}}>Rate of Currency</caption>
                        <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Rials</th>
                            <th>Last Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Euro</td>
                            <td>{this.state.euro[0]}</td>
                            <td>{this.state.euro[1]}</td>
                        </tr>
                        <tr>
                            <td>Dollar</td>
                            <td>{this.state.dollar[0]}</td>
                            <td>{this.state.dollar[1]}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>


            </div>

        )
    }


}

export default ChangeCurrency
