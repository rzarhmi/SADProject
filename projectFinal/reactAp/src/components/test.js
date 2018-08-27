import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import './test_style.css';
import { bindActionCreators } from 'redux';
import {logIn} from "../actions/index";

class LogInComp extends Component{
    render(){
        return(
            <div className={"login-div"}>
                <div className="dropdown">
                    <button className="dropbtn">What are You?</button>
                    <div className="dropdown-content">
                        <Link to={"/employer"} onClick={()=>this.props.logIn('employer')}>Manager</Link>
                        <Link to={"/employee"} onClick={()=>this.props.logIn('employee')}>Employee</Link>
                        <Link to={"/user"} onClick={()=>this.props.logIn('user')}>User</Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {logIn: bindActionCreators(logIn, dispatch)}
}

export default connect(null, mapDispatchToProps)(LogInComp)