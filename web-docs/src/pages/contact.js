import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import LearnBox from "../components/learn-box"
import SEO from "../components/seo"
import 'react-animated-term/dist/react-animated-term.css'
import Terminal from 'react-animated-term'
import commands from "../utils/terminal-script"
import rigoURL from "../img/rigo.jpg"
import { Twemoji } from "react-emoji-render"
import render from '../components/icons'

const ContactPage = () => (
    <Layout>
        <div className="container">
            <div className="row justify-content-between align-items-center mb-5">
                {/* Contact Us Section - L hand side */}
                <div className="col-lg-6 text-lg-left">
                    <h2>Contact Us</h2>
                    <p>We're building a bunch of awesome products. If you're interested in working with us, or have a burning feature request you want to talk about, then let us know.</p>
                    <br />
                    <h2>General Inquiries</h2>
                    <p>You may contact us at support@learnpack.com.</p>
                </div>
                {/* Contact Us Section - R hand side */}
                <div className="col-lg-6 text-lg-right">
                    <br/>
                    <h5>Ask for help</h5>
                    <ul>
                        <li>
                            <a>Community Based Support</a>
                        </li>
                        <li>
                            <a>support@learnpack.com</a>
                        </li>
                    </ul>
                    <br />
                    <h5>Say Hello</h5>
                    <ul>
                        <li>
                            <a>support@learnpack.com</a>
                        </li>
                    </ul>
                    <br />
                    <h5>Press Relations</h5>
                    <ul>
                        <li>
                            <a>Contact Alejandro Sanchez</a>
                        </li>
                        <li>
                            <a>support@learnpack.com</a>
                        </li>
                    </ul>
                </div>
            </div>


            {/* <!--Section: Contact v.2--> */}
            <section class=".justify-content-center">

                {/* <!--Section heading--> */}
                <h2 class="h1-responsive font-weight-bold text-left my-4">Message Us</h2>
                {/* <!--Section description--> */}
                <p class="text-left w-responsive mx-auto mb-4">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</p>

                    {/* <!--Grid column--> */}
                    <div class="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                            {/* <!--Grid row--> */}
                            <div class="row">

                                {/* <!--Grid column--> */}
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="name" name="name" class="form-control" />
                                        <label for="name" class="">Your name</label>
                                    </div>
                                </div>
                                {/* <!--Grid column--> */}

                                {/* <!--Grid column--> */}
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="email" name="email" class="form-control" />
                                        <label for="email" class="">Your email</label>
                                    </div>
                                </div>
                                {/* <!--Grid column--> */}

                            </div>
                            {/* <!--Grid row-->

                <!--Grid row--> */}
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="subject" name="subject" class="form-control" />
                                        <label for="subject" class="">Subject</label>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Grid row-->

                <!--Grid row--> */}
                            <div class="row">

                                {/* <!--Grid column--> */}
                                <div class="col-md-12">

                                    <div class="md-form">
                                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                                        <label for="message">Your message</label>
                                    </div>

                                </div>
                            </div>
                            {/* <!--Grid row--> */}

                        </form>

                        <div class="text-center text-md-left">
                            <a class="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Send</a>
                        </div>
                        <div class="status"></div>
                    </div>
                    {/* <!--Grid column--> */}
                    {/* <!--Grid column--> */}


            </section>
            {/* <!--Section: Contact v.2--> */}

        </div>

    </Layout >
)

export default ContactPage