import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import LearnBox from "../../components/learn-box"
import SEO from "../../components/seo"
import 'react-animated-term/dist/react-animated-term.css'
import Terminal from 'react-animated-term'
import commands from "../../utils/terminal-script"
import { Twemoji } from "react-emoji-render"
import render from '../../components/icons'

const Reactjs = () => (
    <Layout>
        <div className="container">
            {/* Header section */}
            <div className="header">
                <h4>React</h4>
                <p>16.13.1 • Public • Published 5 months ago</p>
            </div>
            <hr />
            <div className="description-container row justify-content-between align-items-center mb-5">
                {/* Package description section - L hand side */}
                <div className="package-description col-lg-7 text-lg-left">
                    <h5>React</h5>
                    <p>
                        React is a JavaScript library for creating user interfaces.

                        The react package contains only the functionality necessary to define React components. It is typically used together with a React renderer like react-dom for the web, or react-native for the native environments.
                </p>
                
                    <hr />
                    <h5>Example Usage</h5>
                    <p>
                        <code>
                            var React = require('react');
                    </code>
                    </p>

                    <hr />
                    <h5>Keywords</h5>
                    <p>
                        react, react.js, javascript
                </p>
                <br/>
                <a class="btn btn-primary">Report a vulnerability</a>

                </div>


                {/* Statistics section - R hand side */}
                <div className="package-statistics col-lg-5 text-lg-right">
                    <p>
                        <u>Install:</u>
                        <br/>
                    <code className="installation-example">
                            $ learnpack install:exercises
                    </code>
                    </p>

                    <p>
                        <u>Weekly Downloads:</u>
                        <br/>
                        37,547
                    </p>

                    <p>
                        <u>Version:</u>
                        <br/>
                        16.13.1
                    </p>

                    <p>
                        <u>Unpacked Size:</u>
                        <br/>
                        204 kB
                    </p>

                    <p>
                        <u>Repository:</u>
                        <br/>

                        <a >https://github.com/learnpack</a>
                    </p>

                    <p>
                        <u>Last Publish:</u>
                        <br/>
                        7 days ago
                    </p>

                </div>
            </div>
        </div>

    </Layout >
)

export default Reactjs