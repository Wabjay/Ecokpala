import React from 'react'
import '../App.css';
import Schedule from "../imgs/schedule.svg"
import Apply from "../imgs/apply.svg"
import Pay from "../imgs/pay.svg"

function Instruction() {
  return (
    <section className="section" id="instruction">
    <div className="container text-center">
        <p className="section-subtitle">How it works</p>
        <h6 className="section-title mb-6">Booking a session is super easy!</h6>
        <div className="row">
             <div className="col-md-4">
                    <div className="service-card">
                        <div className="body">
                            <img src={Apply} alt="bootcamps" className="icon"/>
                            <h3 className="title">Apply</h3>
                            <p className="booking">I facilitate entrepreneurship training modules for competitions,
                                hackathons, ideathons, incubators and accelerators</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="service-card">
                        <div className="body">
                            <img src={Pay} alt="1 - 1 Coaching" className="icon"/>
                            <h3 className="title">Pay</h3>
                            <p className="booking">I advise enterpreneurs on specific business operations and development
                                areas from sizing a market to pitching and fundraising</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="service-card">
                        <div className="body">
                            <img src={Schedule} alt="Masterclasses" className="icon"/>
                            <h3 className="title">Schedule</h3>
                            <p className="booking">I organize budding and growth hacking sessions on business planning,
                                development and operational requirements for enterpreneurs success</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</section>
  )
}

export default Instruction