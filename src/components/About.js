import React from 'react'
import '../App.css'
import Man from '../imgs/man.jpeg'


function About() {
  return (
    <section className="section pt-0" id="about">
    <div className="container text-center">

        <div className="about">
            <div className="about-img-holder">
                <img src={Man} className="about-img" alt="Image of Emmanuel Okpala" />
            </div>
            <div className="about-caption">
                <p className="section-subtitle">Who Am I ?</p>
                <h2 className="section-title mb-3">About Me</h2>
                <p>
                    I have over a decade of experience in consultancy, design, operations and management. My
                    experience spans for-profit, non-profit, and governmental organisations. My background is in
                    Architecture and Urban Design. I have managed projects, programs and business development roles
                    for leading organisations in Nigeria.
                    <br/>
                        <br/>
                            I am one of three Africans and West Africa's only certified trainer in the global climate
                            competition - The ClimateLaunchpad. I have taught, coached, and mentored aspiring and budding
                            enterpreneurs in Africa and Europe. My bootcamps and coaching sessions enable entrepreneurs
                            start and run successful businesses that targets any of the UN SDGs.
                        </p>
                    </div>
            </div>
        </div>
</section>
  )
}

export default About