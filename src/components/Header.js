import React from 'react'
import '../App.css'

function Header() {
  return (
    <header id="home" className="header">
    <div className="overlay"></div>
    <div className="header-content container">
        <h1 className="header-title">
            <span className="up">HI!</span>
            <span className="down">I am Emmanuel Okpala</span>
        </h1>
        <p className="header-subtitle">I Help Aspiring and Budding entrepreneurs. Start Up Right.</p>
    </div>
</header>
  )
}

export default Header