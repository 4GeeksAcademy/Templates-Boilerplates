import {Link} from "gatsby"
import React from "react"
import logoURL from "../img/4geeksacademy.png"
import { Twemoji }  from "react-emoji-render"

const Header = () => {
    return <header className="sticky-top navigation">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <Link className="navbar-brand logo" href="index.html">
                    <img className="logo" src={logoURL} />
                </Link>
                <ul className="navbar-nav mx-4 align-items-center ml-auto">
                    <li className="nav-item"><Link className="btn btn-sm btn-outline-primary ml-lg-4" to="/quick-start">Documentation</Link></li>
                </ul>
            </nav>
        </div>
    </header>
}

export default Header;