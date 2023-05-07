import React from 'react'
import '../App.css';
import Avatar3 from '../imgs/avatar3.jpeg'
import Avatar2 from '../imgs/avatar2.jpeg'


function Testimonial() {
  return (
    <section className="section" id="testmonial">
        <div className="container text-center">
            <p className="section-subtitle">What Clients Say About Me ?</p>
            <h6 className="section-title mb-6">Testmonial</h6>

            <div className="row">
                <div className="col-md-6">
                    <div className="testimonial-card">
                        <div className="testimonial-card-img-holder">
                            <img src={Avatar2} className="testimonial-card-img"
                                alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page"/>
                        </div>
                        <div className="testimonial-card-body">
                            <p className="testimonial-card-subtitle">I met Mr. Okpala during a training session where he
                                served as one of the facilitators, he is an excellent coach, a patient and supportive
                                trainer and I was very fortunate to have the incredible opportunity to work with Mr.
                                Okpala closely as my pitch tutor and coach. He listens carefully and goes to the very
                                essence of what you are trying to accomplish. His ability to bring out the best in each
                                of his students is truly remarkable. He encourages you to take risks, poses questions
                                that really makes you think, and provides an atmosphere of support.</p>
                            <h6 className="testimonial-card-title">Eneyi Oshi - Agrisiti</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="testimonial-card">
                        <div className="testimonial-card-img-holder">
                            <img src={Avatar3} className="testimonial-card-img"
                                alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page"/>
                        </div>
                        <div className="testimonial-card-body">
                            <p className="testimonial-card-subtitle">Mr Emmanuel Okpala was my tutor in the last cohort of
                                climate launchpad as a participant. His mode of delivery of the course content is unique
                                in that he teaches with practical example. Aside this, he is a good listener, giving us
                                the opportunity to express ourselves and as such making us understanding and assimilate
                                the content. It was these qualities he possess that made me stick to him since then till
                                now. I tagged him an impact teacher, tutor and friend.</p>
                            <h6 className="testimonial-card-title">Babatunde Adebayo - Eco Circular Solutions Provider</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> 
  )
}

export default Testimonial