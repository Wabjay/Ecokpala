import React, { useState } from 'react'
import '../App.css'
import axios from 'axios';
import { message, notification } from 'antd';

function Contact() {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('mine');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


    const formData = (fields) => {
        fields.preventDefault()
        try {
            setLoading(true);

            const headers_ = {
                'Authorization': 'Bearer patd5XJefFAMxWXmb.3da22d3f260403f441b8e39442f1accd4d18adfc2ada549ca7e31ebcb8df915d',
                'Content-Type': 'application/json'
            };
            axios.post('https://api.airtable.com/v0/appHpGFLRdNMBkaIA/contact',
                {
                    fields:{
                        name: name,
                        email: email,
                        message: message
                    }
                    },
                     { headers: headers_ }
            )
                .then((resp) => {
                    setLoading(false);
                    fields.target.reset();
                    notification.success({
                        message: "Form submitted",
                        description: "Thank you for contacting us.",
                      })
                    console.log(fields)
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);

                })
        } finally {
            setLoading(false);
        }
    }


  return ( 
    <section className="section" id="contact">
    <div className="container text-center">
        <p className="section-subtitle">Want to know more?</p>
        <h6 className="section-title mb-5">Contact Me</h6>
      
        <form action="" onSubmit={formData} className="contact-form col-md-10 col-lg-8 m-auto">
            <div className="form-row">
                <div className="form-group col-sm-6">
                    <input type="text" size="50" className="form-control" placeholder="Your Name" required 
                     onChange={(event) =>
                        setName(event.target.value)
                      }/>
                </div>
                <div className="form-group col-sm-6">
                    <input type="email" className="form-control" placeholder="Enter Email" requried
                     onChange={(event) =>
                        setEmail(event.target.value)
                      }/>
                </div>
                <div className="form-group col-sm-12">
                    <textarea name="comment" id="comment" rows="6" className="form-control"
                        placeholder="Write Something" 
                        onChange={(event) =>
                            setMessage(event.target.value)
                          }></textarea>
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