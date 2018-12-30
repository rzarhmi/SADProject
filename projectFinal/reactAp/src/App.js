import React, { Component } from 'react';
import {BrowserRouter, Route, Link,Switch } from 'react-router-dom'


import HomePage from  './components/home-page'
import ChangeCurrency from './components/user/change-currency'
import ContactUs from "./components/user/contact-us";
import Notifications from './components/user/notifications'
import TransactionHistory from './components/user/transaction-history'
import TestList from './components/user/tests-list'
import UserHome from './components/user/user-home'
import Wallet from './components/user/wallet'
import EmployeeHome from './components/employee/employee-home'
import EmployeeMessages from './components/employee/messages'
import EmployeePreviousTransactions from './components/employee/previous-transactions'
import RequestedTransactions from './components/employee/requested-transactions'
import AddEmployee from './components/employer/add-employee'
import AddTest from './components/employer/add-test'
import ChargeCredit from './components/employer/charge-credit'
import EmployeeList from './components/employer/employee-list'
import EmployerHome from './components/employer/employer-home'
import EmployerMessages from './components/employer/messages'
import EmployerPreviousTransactions from './components/employer/previous-transactions'
import Tests from './components/employer/tests'
import UserList from './components/employer/user-list'
import UserTransactions from './components/employer/user-transactions'
import navbar from './components/navbar'
import LogIn from './components/test'
import ContactBare from './components/ContactBare'
import AboutUs from './components/AboutUs'
import Terms from './components/Terms'
import Commision from './components/Commision'
import SignUp from './components/signup'
import SignIn from './components/signin'
import ProfileView from './components/user/profileView'
import ProfileEdit from './components/user/Profile'
import loginEmp from './components/employee/loginEmp'
import loginAdmin from './components/employer/loginAdmin'
import UserChargeCredit from './components/user/charge-credit'
import onlineCurrency from './components/onlineCurrency'
import convertTest from './components/convertCurrency'
import Transfer from './components/user/transfer'

class App extends Component {
    render(){
        return(

            <div>
                <BrowserRouter>
                <Switch>
                    //route /
                    <Route exact path={"/"} component={HomePage}/>


                    <Route exact path={"/home"} component={HomePage}/>
                    <Route exact path={"/user"} component={UserHome}/>
                    <Route exact path={"/user/convertCurrency"} component={ChangeCurrency}/>
                    <Route exact path={"/user/contactUs"} component={ContactUs}/>
                    <Route exact path={"/user/notifications"} component={Notifications}/>
                    <Route exact path={"/user/myTransactions"} component={TransactionHistory}/>
                    <Route exact path={"/user/tests"} component={TestList}/>
                    <Route exact path={"/user/wallet"} component={Wallet}/>
                    <Route exact path={"/employee"} component={EmployeeHome}/>
                    <Route exact path={"/employee/messages"} component={EmployeeMessages}/>
                    <Route exact path={"/employee/transactions"} component={EmployeePreviousTransactions}/>
                    <Route exact path={"/employee/reqTransactions"} component={RequestedTransactions}/>
                    <Route exact path={"/employer"} component={EmployerHome}/>
                    <Route exact path={"/employer/usersList"} component={UserList}/>
                    <Route exact path={"/employer/employeeList"} component={EmployeeList}/>
                    <Route exact path={"/employer/addEmployee"} component={AddEmployee}/>
                    <Route exact path={"/employer/tests"} component={Tests}/>
                    <Route exact path={"/employer/addTest"} component={AddTest}/>
                    <Route exact path={"/employer/userTransactions"} component={UserTransactions}/>
                    <Route exact path={"/employer/myTransactions"} component={EmployerPreviousTransactions}/>
                    <Route exact path={"/employer/charge"} component={ChargeCredit}/>
                    <Route exact path={"/employer/messages"} component={EmployerMessages}/>
                    <Route exact path={"/signin"} component={SignIn}/>
                    <Route exact path={"/contactbare"} component={ContactBare}/>
                    <Route exact path={"/aboutus"} component={AboutUs}/>
                    <Route exact path={"/terms"} component={Terms}/>
                    <Route exact path={"/commision"} component={Commision}/>
                    <Route exact path={"/user/chargeCredit"} component={UserChargeCredit}/>
                    <Route exact path={"/signup"} component={SignUp}/>
                    <Route exact path={"/signin"} component={SignIn}/>
                    <Route exact path={"/user/profile"} component={ProfileView}/>
                    <Route exact path={"/user/profileedit"} component={ProfileEdit}/>
                    <Route exact path={"/loginEmp"} component={loginEmp}/>
                    <Route exact path={"/loginAdmin"} component={loginAdmin}/>
                    <Route exact path={"/onlinecurrency"} component={onlineCurrency}/>
                    <Route exact path={"/converttest"} component={convertTest}/>
                    <Route exact path={"/user/transfer"} component={Transfer}/>


                    <Route exact path={"/ok"} component={LogIn}/>



                </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App

