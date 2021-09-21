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
                  My name is Volodymyr, at the time of writing this, I am 20 y.o. finishing my B.A. in Computer Science.
                  A passionate, apt, and highly motivated student
                  who yet finds so much beauty in this world - this is how I would describe myself in a few words.
                  <br /><br />
                  Hope I haven't lost you with that cheesy line at the end,
                  then in case of collaboration connect with me through the links below.
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
                    During my studies, I've tried and learned many popular languages and technologies:
                    by doing projects that involve low-level and system programming (C, Rust, Assembly),
                    ones that are handy for Data Analysis (Python, Julia), and the ones that dominate the web (JavaScript, Go).
                    <br />Some of the projects were done for the uni, others remain hidden on my hard drive, and a few get to meet GitHub repos.
                    <br /><br />My motto "If it's hard going, it's worth doing".<br />
                    Even though a lot of my study hours are spent on computer science-related books and materials, I love exploring new areas of expertise,
                    including: mathematics, philosophy, music, physics, etc. Often, if a field rests on a mathematical basis - I am intrigued.
                    </p>
                </div>
                <div id="hobbies" className="col s12">
                  <p>
                    I am passionate about learning new things, reading, and getting my hands dirty by coding.
                    <br />
                    I've picked up a piano last summer, maybe one day I will convert myself into a full-time musician and sell a million copies
                    with just songs about the hardship of being a programmer (trust me, there are plenty).
                    <br />
                    I also got into running more than a year ago, a great meditation practice I can handle.
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
