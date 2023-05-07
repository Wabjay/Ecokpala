import React from 'react'
import '../App.css'

function Contact() {
  return ( 
    <section className="section" id="contact">
    <div className="container text-center">
        <p className="section-subtitle">Want to know more?</p>
        <h6 className="section-title mb-5">Contact Me</h6>
      
        <form action="" className="contact-form col-md-10 col-lg-8 m-auto">
            <div className="form-row">
                <div className="form-group col-sm-6">
                    <input type="text" size="50" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="form-group col-sm-6">
                    <input type="email" className="form-control" placeholder="Enter Email" requried/>
                </div>
                <div className="form-group col-sm-12">
                    <textarea name="comment" id="comment" rows="6" className="form-control"
                        placeholder="Write Something"></textarea>
                </div>
                <div className="form-group col-sm-12 mt-3">
                    <input type="submit" value="Send Message" className="btn btn-outline-primary rounded"/>
                </div>
            </div>
        </form>
    </div>
</section>
  )
}

export default Contact