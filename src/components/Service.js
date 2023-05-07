import React from 'react'
import '../App.css';

import Pencil from "../imgs/pencil-case.svg"
import Responsive from "../imgs/responsive.svg"
import Toolbox from "../imgs/toolbox.svg"
import Analytics from "../imgs/analytics.svg"

function Service() {
  return (
    <section className="section" id="service">
        <div className="container text-center">
            <p className="section-subtitle">What I Do ?</p>
            <h6 className="section-title mb-6">Service</h6>
       
            <div className="row">
                <div className="col-md-6 col-lg-3">
                    <div className="service-card">
                        <div className="body">
                            <img src={Pencil} alt="bootcamps" className="icon"/>
                            <h6 className="title">Bootcamps</h6>
                            <p className="subtitle">I facilitate entrepreneurship training modules for competitions,
                                hackathons, ideathons, incubators and accelerators</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="service-card">
                        <div className="body">
                            <img src={Responsive} alt="1 - 1 Coaching" className="icon"/>
                            <h6 className="title">1 - 1 Coaching</h6>
                            <p className="subtitle">I advise enterpreneurs on specific business operations and development
                                areas from sizing a market to pitching and fundraising</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="service-card">
                        <div className="body">
                            <img src={Toolbox} alt="Masterclasses" className="icon"/>
                            <h6 className="title">Masterclasses</h6>
                            <p className="subtitle">I organize budding and growth hacking sessions on business planning,
                                development and operational requirements for enterpreneurs success</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="service-card">
                        <div className="body">
                            <img src={Analytics} alt="Business Plan" className="icon"/>
                            <h6 className="title">Business Plan</h6>
                            <p className="subtitle">I develop and design highly productive business plans and engaging pitch
                                decks for strategic direction and reaching fundraising goals</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Service