/*    --------------------------- Comment Block ------------------------------------
      |  Component: Convert Currencies
      |
      |  Purpose:  Component for displaying a chart with the aim of
      |      converting between sample amounts of currencies, based on
      |      rate of different currencies in our database.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import '../styles/user/change-currency.css'
import Navbar from '../components/navbar'
import Parse from 'parse'


class ChangeCurrency extends Component{
  //component's constructor for initializing settings.
    constructor(props){
        super(props);
        Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
        Parse.serverURL = 'http://localhost:8030/wp';
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleConvert = this.handleConvert.bind(this);
        this.state={
            euro:[],
            dollar:[]
        }
    }
    componentDidMount(){
        this.getDataFromServer();
    }
    //component's function, invoked after component's mounting, to fetch required data from server.
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
    // function for handling conversion between currencies, this page do this
    // for test, and there is no need to be logged in as a user.
    handleConvert(){
        let initCurrValue = parseInt(document.getElementById('initcurr-value').value);
        let initCurr = document.getElementById("initcurr").value;
        let destCurr = document.getElementById("destcurr").value;
        let result = 0;
        switch (initCurr) {
            case "Dollar":
                result = initCurrValue * parseInt(this.state.dollar[0]);
                break;
            case "Rial":

                break;
            case "Euro":
                result = initCurrValue * parseInt(this.state.euro[0]);
                break;

        }
        switch (destCurr) {
            case "Dollar":
                result = result / parseInt(this.state.dollar[0]);
                break;
            case "Rial":

                break;
            case "Euro":
                result = result / parseInt(this.state.euro[0]);
                break;

        }
        this.setState(
            {output:result}
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
                    <table style={{float:"right",minWith:"50%",padding: "10px"}}>
                        <caption style={{backgroundColor: "#4CAF50",color: "white", paddingBottom: "20px"}}>Change Form</caption>
                        <thead>
                        <tr>
                            <th>Change From</th>
                            <th>Amount</th>
                            <th>Change To</th>
                            <th>Amount</th>
                            <th>Accept</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><select id="initcurr">
                                <option value="Dollar">Dollar</option>
                                <option value="Rial">Rial</option>
                                <option value="Euro">Euro</option>
                            </select> </td>
                            <td><input type='text' style={{maxWidth:"100px"}} id='initcurr-value'/></td>
                            <td><select id="destcurr">
                                <option value="Dollar">Dollar</option>
                                <option value="Rial">Rial</option>
                                <option value="Euro">Euro</option>
                            </select> </td>
                            <td><p id="output" type='text' style={{maxWidth:"100px"}} id="destcurr">{this.state.output}</p></td>
                            <td><button id="submitForm" value="confirm" onClick={this.handleConvert} style={{backgroundColor: "#4CAF50",color: "white",padding: "12px 20px",border: "none",borderRadius: "4px",cursor: "pointer", float: "left"}} type='submit'>Convert</button></td>

                        </tr>
                        </tbody>
                    </table>

                </div>


            </div>

        )
    }


}

export default ChangeCurrency
