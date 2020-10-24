import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import LearnBox from "../components/learn-box"
import SEO from "../components/seo"
import 'react-animated-term/dist/react-animated-term.css'
import Terminal from 'react-animated-term'
import commands from "../utils/terminal-script"
import rigoURL from "../img/rigo.jpg"
import { Twemoji }  from "react-emoji-render"
import render from '../components/icons'

const IndexPage = () => (
  <Layout className="bg-white">
    <SEO title="Home" />
        <section className="section pb-0">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-12 text-center text-lg-left">
                        <h1 className="mb-4">4Geeks Academy Boilerplates <Twemoji text="👩🏽‍🎓" /></h1>
                        <p className="mb-4">Start building a project on any technology in a matter of secongs</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="section p-0">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 mb-4">
                        <LearnBox label="HTML/CSS" icon="html" />
                    </div>
                    <div className="col-sm-6 mb-4">
                        <LearnBox label="Python" icon="python" />
                    </div>
                    <div className="col-sm-6 mb-4">
                        <LearnBox label="Javascript" icon="javascript" />
                    </div>
                </div>
            </div>
        </section>

        <section className="section pb-0 supported">
            <div className="container">
                <h2 className="section-title text-center">Supported by popular coding IDE's</h2>
                <ul>
                    <li>{render("visual-studio")}</li>
                    <li>{render("gitpod")}</li>
                    <li>{render("atom")}</li>
                    <li>{render("sublime")}</li>
                    <li>{render("webstorm")}</li>
                    <li>{render("eclipse")}</li>
                </ul>
            </div>
        </section>

        <section className="section pb-0">
            <div className="container">
                <h2 className="section-title">Mostly Asked Questions</h2>
                <div className="row masonry-wrapper">
                <div className="col-md-6 mb-4">
                    <div className="card card-lg">
                    <div className="card-body">
                        <h3 className="card-title h5">Will updates also be free?</h3>
                        <p className="card-text content">Lorem, <a href="https://examplesite.com">link</a> <em>ipsum</em> dolor sit amet consectetur adipisicing elit. Cumque praesentium nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae maxime perspiciatis iste placeat architecto, mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo, unde cum omnis vel sed temporibus. mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo, unde cum
                        omnis vel sed temporibus. mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore reprehenderit
                        illo, unde cum omnis vel sed temporibus.</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card card-lg">
                    <div className="card-body">
                        <h3 className="card-title h5">Discounts for students and Non Profit Organizations?</h3>
                        <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                        maxime perspiciatis iste placeat architecto.</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card card-lg">
                    <div className="card-body">
                        <h3 className="card-title h5">I need something unique, Can you make it?</h3>
                        <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                        maxime perspiciatis iste placeat architecto, mollitia delectus <a href="https://examplesite.com">link</a>
                        ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo, unde cum omnis vel sed temporibus,
                        repudiandae impedit nam ad enim porro, qui labore fugiat quod suscipit fuga necessitatibus. Perferendis,
                        ipsum?</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card card-lg">
                    <div className="card-body">
                        <h3 className="card-title h5">Is there any documentation and support?</h3>
                        <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                        maxime perspiciatis iste placeat architecto, mollitia delectus <a href="https://examplesite.com">link</a>
                        ut ab quibusdam.</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card card-lg">
                    <div className="card-body">
                        <h3 className="card-title h5">Any refunds?</h3>
                        <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                        maxime perspiciatis iste placeat architecto.</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card card-lg">
                    <div className="card-body">
                        <h3 className="card-title h5">What is a product key?</h3>
                        <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="row align-items-center">
                <div className="col-lg-4 text-center d-lg-block d-none">
                    <img src={rigoURL} style={{ height: "200px"}} className="img-fluid" alt="" />
                </div>
                <div className="col-lg-8 text-lg-left text-center">
                    <h2 className="mb-3">Still Didn&rsquo;t Find Your Answer?</h2>
                    <p>Add a ticket in the main LearnPack repository on Github and we will make sure to answer it ASAP!</p>
                    <a href="https://github.com/learnpack/learnpack/issues/new" className="btn btn-primary">Submit a ticket</a>
                </div>
                </div>
            </div>
        </section>
  </Layout>
)

export default IndexPage
