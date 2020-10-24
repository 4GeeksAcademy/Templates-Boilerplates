import React from "react"
import render from './icons'
import {Link} from "gatsby"

const Footer = () => {
    return <footer>
        <div className="container">
            <div className="row align-items-center border-bottom py-5">
            <div className="col-lg-5">
                <ul className="list-inline footer-menu text-center text-lg-left">
                <li className="list-inline-item"><a href="changelog.html">Changelog</a></li>
                <li className="list-inline-item"><Link to="/contact">Contact</Link></li>
                <li className="list-inline-item"><a href="search.html">Search</a></li>
                </ul>
            </div>
            <div className="col-lg-4 ml-auto">
                <ul className="list-inline social-icons text-lg-right text-center">
                    <li className="list-inline-item"><a href="https://github.com/learnpack"><i>{render("github")}</i></a></li>
                    <li className="list-inline-item"><a href="#"><i>{render("twitter")}</i></a></li>
                    <li className="list-inline-item"><a href="#"><i>{render("youtube")}</i></a></li>
                </ul>
            </div>
            </div>
            <div className="py-4 text-center">
                <small className="text-light">Copyright © {new Date().getFullYear()} by <a href="https://breatheco.de">BreatheCode LLC</a></small>
            </div>
        </div>
    </footer>;
}

export default Footer;