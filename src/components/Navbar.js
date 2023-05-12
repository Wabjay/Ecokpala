import React, { useEffect, useState } from 'react'
import '../App.css';
import $ from 'jquery'
function Navbar() {
  
    const [scroll, setScroll] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50)
    })
  }, [])
    // navbar toggle
   const handleToggle = () => {
        $(this).toggleClass('is-active')
        $('ul.nav').toggleClass('show');
    };
  return (
    <nav className={`custom-navbar ${scroll && "affix"}`} data-spy="affix" data-offset-top="20">
        <div className="container">
            <a className="logo" href="#">ecokpala</a>
            <ul className="nav">
                <li className="item">
                    <a className="link" href="#home">Home</a>
                </li>
                <li className="item">
                    <a className="link" href="#about">About</a>
                </li>
                <li className="item">
                    <a className="link" href="#portfolio">Portfolio</a>
                </li>
                <li className="item">
                    <a className="link" href="#testmonial">Testmonial</a>
                </li>
                <li className="item">
                    <a className="link" href="#contact">Contact</a>
                </li>
                {/* <li className="item">
                    <a className="link" href="#blog">Blog</a>
                </li> */}
            </ul>
            <a href="javascript:void(0)" id="nav-toggle" onClick={handleToggle} className="hamburger hamburger--elastic">
                <div className="hamburger-box">
                    <div className="hamburger-inner"></div>
                </div>
            </a>
        </div>
    </nav>
  )
}

export default Navbar