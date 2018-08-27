/*    --------------------------- Comment Block ------------------------------------
      |  Component: About Us
      |
      |  Purpose:  Component for displaying a simple html, reperesenting
      |      our organization's history, and explaining our aims and purposes
      |       to start this project.
      |
      *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import '../styles/user/home-page.css'
import {Link} from 'react-router-dom'
import NavBar from './navbar'

class AboutUs extends Component {
  /*    This function helps us to make our Navigation Bar responsive to
        changes of width when the user resizes the browser.
  */
  navbarResponsive() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  /*    Render function of our Component to display required HTML code.
        This component is available in every component; it renders
        proper HTML code based on the component's state.
  */
  render() {
    return (<div>
      <NavBar/>
      <br/>
      <br/>
      <br/>

      <div className="text-center" style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "white"
        }}>

        <div className="row">
          <div className="col-sm-8">
            <h2 className="mt-4">What We Do</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deserunt neque tempore recusandae animi soluta quasi? Asperiores rem dolore eaque vel, porro, soluta unde debitis aliquam laboriosam. Repellat explicabo, maiores!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis optio neque consectetur consequatur magni in nisi, natus beatae quidem quam odit commodi ducimus totam eum, alias, adipisci nesciunt voluptate. Voluptatum.</p>

          </div>
        </div>
      </div>

    </div>)
  }
}

export default AboutUs
