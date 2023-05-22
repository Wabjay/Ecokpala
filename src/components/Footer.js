import React from 'react'
import '../App.css'
import Instagram from "../imgs/instagram.svg";
import Facebook from "../imgs/facebook.svg";
import Twitter from "../imgs/twitter.svg";
import LinkedIn from "../imgs/linkedin.svg";

function Footer() {
  const Copyright = new Date().getFullYear()

  return (
    <div className="container">
    <footer className="footer">
        <p className="mb-0">Copyright
           {Copyright} &copy; <a href="http://www.ecokpala.com">Emmanuel
                Okpala</a>
        </p>
        <div className="social-links text-right m-auto ml-sm-auto">
            <a href="https://www.facebook.com/emmacokpala" target='_blank' className="link"><img src={Facebook} alt="" /></a>
            <a href="https://www.twitter.com/emmacokpala" target='_blank' className="link"><img src={Twitter} alt="" /></a>
            <a href="https://www.instagram.com/emmacokpala" target='_blank' className="link"><img src={Instagram} alt="" /></a>
            <a href="https://www.linkedin.com/in/emmacokpala" target='_blank' className="link"><img src={LinkedIn} alt="" /></a>
        </div>
    </footer>
</div>
  )
}

export default Footer