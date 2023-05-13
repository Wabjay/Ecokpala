import React from 'react'
import '../App.css'

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
            <a href="https://www.facebook.com/emmacokpala" className="link"><i className="fa fa-facebook"></i></a>
            <a href="https://www.twitter.com/emmacokpala" className="link"><i className="ti-twitter-alt"></i></a>
            <a href="https://www.instagram.com/emmacokpala" className="link"><i className="ti-instagram"></i></a>
            <a href="https://www.linkedin.com/in/emmacokpala " className="link"><i className="ti-linkedin"></i></a>
        </div>
    </footer>
</div>
  )
}

export default Footer