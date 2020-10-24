import React from 'react'
import logoURL from "../../img/4geeksacademy.png"

function Logo(props) {
  return (
    <div class="logo" style={{ fontSize: "35px", fontWeight: 800 }}>
        <img className="logo" src={logoURL} style={{ maxHeight: "60px" }} />
    </div>
  )
}

export default Logo
