import React from "react"
import { Link } from "gatsby"

import render from './icons'

const LearnBox = ({ label, icon, to }) => <div className="card match-height">
    <div className="card-body d-flex">
        <div>
            <i className="card-icon ti-panel mb-4">{render(icon)}</i>
            
        </div>
        <div>
            <h3 className="card-title h4">{label}</h3>
            <p className="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
            <Link to={to} className="stretched-link"></Link>
        </div>
    </div>
</div>;

export default LearnBox;