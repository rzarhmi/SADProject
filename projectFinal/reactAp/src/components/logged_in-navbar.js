/*    --------------------------- Comment Block ------------------------------------
      |  Component: Logged In Navbar
      |
      |  Purpose:  Based on our app's redux state, decide which kind of navbar
      |      should be displayed for the logged-in person.
      |       this Component will help users to explore the site with a
      |       better experience.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/user/home-page.css'
import EmployerNavBar from './employer/employer-navbar'
import EmployeeNavBar from './employee/employee-navbar'
import UserNavBar from './user/user-navbar'


class LoggedInNavbar extends Component{
    render(){
        switch (this.props.whoIsLoggedIn){
            case 'employer':
                return <EmployerNavBar/>;
            case 'employee':
                return <EmployeeNavBar/>
            case 'user':
                return <UserNavBar/>
        }
    }
}

function mapStateToProps(state) {
    return {whoIsLoggedIn: state.log.whoIsLoggedIn};
}

export default connect(mapStateToProps)(LoggedInNavbar)
