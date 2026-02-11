import React, {Fragment, Component} from "react"
/* import EmailForm from "../components/EmailForm"*/
import M from "materialize-css"
import "./About.css"
import SocialList from "./../components/SocialList"

export default class About extends Component {
  componentDidMount() {
    M.Parallax.init(document.querySelectorAll(".parallax"))
    M.Tabs.init(document.querySelectorAll(".tabs"))
  }
  render() {
    return (
      <Fragment>
        {/* <!-- services / tabs --> */}
        <section
          id="services"
          className="section grey darken-4 white-text"
        >
          <div className="container">
            <div className="row ">
              <div className="col s12 l6">
                <h2>Who am I?</h2>
                <p>
                  Uncaught ReferenceError: 'Volodymyr' is not defined           
                </p>
              </div>
              <div className="col s12 l6 ">
                <ul className="tabs grey darken-3 ">
                  <li className="tab col s6">
                    <a href="#programming">Programming</a>
                  </li>
                  <li className="tab col s6">
                    <a href="#hobbies">Hobbies</a>
                  </li>
                </ul>
                <div id="programming" className="col s12">
                  <p>
                    Not language evangelist. I use the right tool for the job. However, Go is my go to :)         
                    </p>
                </div>
                <div id="hobbies" className="col s12">
                  <p>
                    I'm a passionate learner. I like to push my body physically. 
                    I do crossfit, run, cycle, hike and angle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- parallax --> */}
        <div className="parallax-container">
          <div className="parallax">
            <img
              src="images/code.jpeg"
              alt=""
              className="responsive-img"
            />
          </div>
        </div>

        {/* <!-- contact form --> */}
        <section id="contact" className=" section grey darken-4">
          <div className="container">
            <div className="row">
              <h2 className="white-text center-align">
                Get In Touch
              </h2>
              {/*  <div className="col s12 l5 white-text">
                <div className="row">
                  <div className="col s12">
                    <h4>
                      Write me an email
                      <span role="img" aria-label=":)">
                        &#128522;
                      </span>
                    </h4>
                  </div>
                  <div className="col s12">
                    <EmailForm />
                  </div>
                </div>
              </div> */}
              <div className="col s12 l5 offset-l2 white-text">
                <div className="col s12">
                  <h4>
                    Or reach me on socials
                    <span role="img" aria-label=";)">
                      &#128521;
                    </span>
                  </h4>
                </div>
                <div className="col s12">
                  <SocialList />
                  <h5 className="flow-text">
                    volodia23byk@gmail.com
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
