import React from 'react'
import '../App.css';
import Schedule from "../imgs/schedule.svg"
import Apply from "../imgs/apply.svg"
import Pay from "../imgs/pay.svg"

function Instruction() {
  return (
    <section className="section" id="instruction">
    <div className="container text-center">
        <p className="section-subtitle">How it works ?</p>
        <h6 className="section-title mb-6">Booking a session is super easy!</h6>
        <div className="row">
             <div className="col-md-4">
                    <div className="service-card">
                        <div className="body">
                            <img src={Apply} alt="bootcamps" className="icon"/>
                            <h3 className="title">Apply</h3>
                            <p className="subtitle">Hit the subscribe button on any plan of your choice under 'My Pricing" section below, and complete the short form that follows.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="service-card">
                        <div className="body">
                            <img src={Pay} alt="1 - 1 Coaching" className="icon"/>
                            <h3 className="title">Pay</h3>
                            <p className="subtitle">Make payment for your choice plan following the instructions you received via the email you provided upon completion of the Application Form.
</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="service-card">
                        <div className="body">
                            <img src={Schedule} alt="Masterclasses" className="icon"/>
                            <h3 className="title">Schedule</h3>
                            <p className="subtitle">Book a slot convenient for you using following the calendar instructions you received via email upon confirmation of your payment made.</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</section>
  )
}

export default Instruction