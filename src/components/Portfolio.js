import React from 'react'
import '../App.css';
import Clp10 from "../imgs/clp10.png"
import Cipitch from "../imgs/cipitch.png"
import Uslbp from "../imgs/uslbp.png"

function Portfolio() {
  return (
    <section className="section" id="portfolio">
    <div className="container text-center">
        <p className="section-subtitle">What I Did ?</p>
        <h6 className="section-title mb-6">Portfolio</h6>
        <div className="row">
            <div className="col-md-4">
                <a href="#" className="portfolio-card">
                <img src={Clp10} className="portfolio-card-img"
                        alt="ClimateLaunchpad 10 Years Anniversary Logo"/>
                    <span className="portfolio-card-overlay">
                        <span className="portfolio-card-caption">
                            <h4>ClimateLaunchpad</h4>
                                <p className="font-weight-normal">Category: Bootcamps</p>
                        </span>
                    </span>
                </a>
            </div>
            <div className="col-md-4">
                <a href="#" className="portfolio-card">
                    <img className="portfolio-card-img" src={Cipitch}
                        alt="Front Cover for Client and Investor Pitch Slides"/>
                    <span className="portfolio-card-overlay">
                        <span className="portfolio-card-caption">
                            <h4>Art of Pitching</h4>
                                <p className="font-weight-normal">Category: Masterclasses</p>
                        </span>
                    </span>
                </a>
            </div>
            <div className="col-md-4">
                <a href="#" className="portfolio-card">
                    <img className="portfolio-card-img" src={Uslbp}
                        alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page"/>
                    <span className="portfolio-card-overlay">
                        <span className="portfolio-card-caption">
                            <h4>UrbanSphere Limited</h4>
                                <p className="font-weight-normal">Category: Business Plans</p>
                        </span>
                    </span>
                </a>
            </div>
        </div>
    </div>
</section>
  )
}

export default Portfolio