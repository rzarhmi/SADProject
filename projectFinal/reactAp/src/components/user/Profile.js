/*    --------------------------- Comment Block ------------------------------------
      |  Component: View Profile
      |
      |  Purpose:  Component for displaying user's profile data. data such as:
      |       Name, Registration Date, Email,...
      |       Here user can edit it's profile data and after submit, all data
      |       will be stored in the database.
      |
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react';
import Parse from 'parse'
import {connect} from 'react-redux'
import NavBar from '../../components/navbar'

class Profile extends Component {
  /*    Component's constructor for initializing settings.
        This data includes initializing Parse-server
        requirements and binding component to different functions.
  */

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
    Parse.serverURL = 'http://localhost:8030/wp';
  }
  /*    Function for handling user's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */
  handleSubmit() {
    let values = document.getElementById("profileEditForm").elements;

    // Array.prototype.forEach.call(values,(value)=>{
    //         console.log(value.value);
    // });

    let currentUser = Parse.User.current();
    if (!currentUser) {
      alert("Please Login First!");
      return
    }
    let profilePic = document.getElementById("ProfileInput").files[0];
    if (profilePic) {
      let file = profilePic;
      let name = 'photo.jpg';

      let parseFile = new Parse.File(name, file);
      currentUser.set('ProfilePic', parseFile);
    }

    if (values[0].value)
      currentUser.set("name", values[0].value);

    if (values[1].value)
      currentUser.set("lastname", values[1].value);

    if (values[2].value)
      currentUser.set("email", values[2].value);

    if (values[3].value)
      currentUser.set("username", values[3].value);

    if (values[4].value)
      currentUser.set("city", values[4].value);

    if (values[5].value)
      currentUser.set("country", values[5].value);

    let radioVal = document.getElementsByName("optradio");
    if (radioVal[0].checked) {
      currentUser.set("gender", "male")
    } else if (radioVal[1].checked) {
      currentUser.set("gender", "female")
    }
    if (values[8].value)
      currentUser.set("birthdate", values[8].value);
    currentUser.save(null, {
      success: function(user) {
        // Execute any logic that should take place after the object is saved.
        alert("user updated");
      },
      error: function(user, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to update user, with error code: ' + error.message);
      }
    });
  }
  /*    Render function of our Component to display required HTML code.
          This component is available in every component; it renders
          proper HTML code based on the component's state.
    */
  render() {
    if (!this.props.isLoggedIn) {
      return <h1>Please login first!</h1>
    }
    return (<div>
      <NavBar/>
      <h1>Edit Profile</h1>
      <div className="row">
        {/* <!-- left column --> */}
        <div style={{
            width: '30%'
          }} className="col-md-3">
          <div className="text-center">
            <h5>Upload a new photo in ".jpg" format</h5>
            <input type="file" id="ProfileInput" accept=".jpg, .png" className="btn btn-primary" style={{
                fontSize: '12px',
                fontFamily: 'Helvetica'
              }}/>
          </div>
        </div>

        {/* <!-- edit form column --> */}
        <div className="col-md-9 personal-info">
          <h3>Personal info</h3>

          <form id="profileEditForm" className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-lg-3 control-label">First name:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" placeholder="New Name"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Last name:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" placeholder="New Lastname"/>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Email:</label>
              <div className="col-lg-8">
                <input type="email" id="defaultForm-email" className="form-control validate" placeholder={"New Email"}/>
                <label data-error="Wrong Mail" data-success="Correct Mail" htmlFor="defaultForm-email"></label>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Username:</label>
              <div className="col-md-8">
                <input className="form-control" type="text" placeholder="New Username"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">City:</label>
              <div className="col-md-8">
                <input className="form-control" type="text" placeholder="New City"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Country:</label>
              <div className="col-md-8">
                <input className="form-control" type="text" placeholder="New Country"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Gender:</label>
              <div className="col-md-8">
                <div className="radio">
                  <label style={{
                      marginRight: '5px'
                    }}>
                    <input type="radio" name="optradio"/>Male</label>
                  <label><input type="radio" name="optradio"/>Female</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Date Of Birth:</label>
              <div className="col-md-8">
                <input className="form-control" type="Date" placeholder="New Date"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label"></label>
              <div className="col-md-8">
                <input type="button" className="btn btn-primary" onClick={this.handleSubmit} value="Save Changes"/>
                <span></span>
                <input type="reset" className="btn btn-default" value="Cancel"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);
  }
}
const mapStateToProps = state => ({isLoggedIn: state.log.isLoggedIn});

export default connect(mapStateToProps)(Profile)
