/*    --------------------------- Comment Block ------------------------------------
      |  Component: Add Test
      |
      |  Purpose:  Component for displaying a form, where the system's Admin
      |           can define new tests for the system. After submitting
      |             new tests can be chosen by users.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import '../../styles/employer/add-test.css'
import Parse from 'parse'
import {Link} from 'react-router-dom';
import NavBar from '../../components/navbar'

class AddTest extends Component {
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
  /*    Function for handling employee's request based on what
          button or request he/she has made. This function uses
          queries from the database, and our component's state to
          handle the request.
    */
  handleSubmit() {
    let values = document.getElementById("testVals").elements;
    let currentUser = Parse.User.current();
    if (!currentUser) {
      alert("Please Login First!");
      return
    }
    let Test = Parse.Object.extend("Tests");
    let test = new Test();

    let profilePic = document.getElementById("ProfileInput").files[0];
    if (profilePic) {
      let file = profilePic;
      let name = 'photo.jpg';

      let parseFile = new Parse.File(name, file);
      test.set('Pic', parseFile);
    }
    test.set('Name', values[0].value);
    test.set('Cost', values[1].value);
    test.set('Description', values[2].value);

    test.save().then((test) => {
      // Execute any logic that should take place after the object is saved.
      alert('New Test created with test id: ' + test.id);
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    });

  }
  /*    Render function of our Component to display required HTML code.
          This component is available in every component; it renders
          proper HTML code based on the component's state.
    */
  render() {
    return (<div>
      <NavBar/>
      <br/>
      <div className="container" style={{
          width: "80%"
        }}>
        <form action="action_page.php" id="testVals">
          <div className="row">
            <div className="col-25">
              <label for="card-number">Test Name</label>
            </div>
            <div className="col-75">
              <input type="text" id="current-charge" name="charge"/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="card-number">Test Cost (Rial)</label>
            </div>
            <div className="col-75">
              <input type="text" id="charge-amount" name="charge" placeholder="0"/>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label for="note">Description</label>
            </div>
            <div className="col-75">
              <textarea id="note" name="subject" placeholder="Write something.." style={{
                  width: "100%"
                }}></textarea>
            </div>

          </div>
          <div className="row">
            <label>
              upload image:</label>
            <input type="file" name="pic" id="ProfileInput" accept="image/*"/>
          </div>
          <br/>
          <br/>
          <div className="row">
            <Link to={"/employer"}><input id="button" type="button" onClick={this.handleSubmit} value="add"/></Link>
          </div>
        </form>
      </div>

    </div>)
  }
}

export default AddTest
