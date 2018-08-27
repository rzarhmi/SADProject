/*------------------------------------------------- NavBar component -----
 |  Component NavBar
 |
 |  Purpose:  Main Component of navbar, which renders a navbar,
 |      depends on which kind of person is logged in (User / Admin / Employee).
 |
 *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoggedInNavBar from './logged_in-navbar'
import LoggedOutNavBar from './logged_out-navbar'


class NavBar extends Component{

    render(){
        return (<div>
                {this.props.isLoggedIn ? (<LoggedInNavBar/>):(<LoggedOutNavBar/>)}
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {isLoggedIn: state.log.isLoggedIn};
}

export default connect(mapStateToProps, null)(NavBar)
