import React, { useState } from 'react'
import '../App.css';
import Scooter from "../imgs/scooter.svg"
import Shipped from "../imgs/shipped.svg"
import Startup from "../imgs/startup.svg"
import axios from 'axios';

import { DatePicker } from 'react-responsive-datepicker'
import 'react-responsive-datepicker/dist/index.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Form, Input, InputNumber, Modal, Select, Upload, RadioChangeEvent, Radio } from 'antd';
import { UploadOutlined } from "@ant-design/icons";


function Pricing() {
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false)
    const [lite, setLite] = useState(false)
    const [basic, setBasic] = useState(false)
    const [pro, setPro] = useState(false)
    const [payment, setPayment] = useState(true)
    const [schedule, setSchedule] = useState(false)
    const [copy, setCopy] = useState(false)
    const [bill, setBill] = useState('')
    const [refId, setRefId] = useState('')
    const [plan, setPlan] = useState('')
    const [canvass, setCanvass] = useState('')
    const [pitch, setPitch] = useState('')

    const addCanvass = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

    const onReset = () => {
        form.resetFields();
      };

    const formData = async (fields) => {
        try {
            setLoading(true);

            const headers_ = {
                'Authorization': 'Bearer patd5XJefFAMxWXmb.3da22d3f260403f441b8e39442f1accd4d18adfc2ada549ca7e31ebcb8df915d',
                'Content-Type': 'application/json'
            };
            axios.post('https://api.airtable.com/v0/appHpGFLRdNMBkaIA/plans',
                {
                    // POST the data
                    fields
                //   "fields":  fields.plan === "lite" && {
                //     "plan": fields.plan,
                //     "company": fields.company,
                //     "firstname": fields.firstname,
                //     "lastname": fields.lastname,
                //     "canvass": fields.canvass,
                //     "stage": fields.stage,
                //     "expectations": fields.expectations,
                //     "canvass-upload": fields.canvass_upload ? fields.canvass_upload[0] : []
                //   }
                }, { headers: headers_ }
            )
                .then((resp) => {
                    console.log("success!")
                    setPayment(true)
                    onReset()
                    setRefId(fields.plan + fields.company + Math.floor(Math.random() * 999))
                   ( fields.plan === "lite" ? (setLite(false), setBill(30)) :
                    fields.plan === "basic" ?  (setBasic(false), setBill(80)) :
                     (setPro(false), setBill(1500)))
                    console.log(fields)
                    setPlan(fields.plan)
                    // setBill(fields.plan === 'lite' ? 30 : fields.plan === 'basic' ? 80 : 1500)
                    console.log(bill, refId);

                    // document.getElementById('payment-title').innerHTML = value.plan + " Plan"

                })
                .catch((error) => {
                    console.log(error);
                })
        } finally {
            setLoading(false);
        }
    }
// Calendar
const oauth2Client = new google.auth.OAuth2('911424646377-tq8og3k1u7mbu0lfugd85p42rvaciqdp.apps.googleusercontent.com', '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');

oauth2Client.setCredentials({
  access_token: 'google access token',
  refresh_token: 'google refresh token',
  expiry_date: 'token expiry date',
});

const calendar = google.calendar({ version: "v3", oauth2Client });

const event = {
  summary: 'Test event',
  description: "Google add event testing.",
  start: {
    dateTime: '2021-11-28T01:00:00-07:00',
    timeZone: 'Asia/kolkata',
  },
  end: {
    dateTime: '2021-11-28T05:00:00-07:00',
    timeZone: 'Asia/Kolkata',
  },
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 30 },
    ],
  },
};

// We make a request to Google Calendar API.
calendar.events.insert({
  auth: oauth2Client,
  calendarId: "primary",
  resource: event,
})
.then((event) =>  console.log('Event created: %s', event.htmlLink))
.catch((error) => console.log('Some error occured', error));
//   End calendar


    return (
        <section className="section" id="pricing">
            <div className="container text-center">
                <p className="section-subtitle">How Much I Charge ?</p>
                <h6 className="section-title mb-6">My Pricing</h6>

                <div className="pricing-wrapper">
                    <div className="pricing-card">
                        <div className="pricing-card-header">
                            <img className="pricing-card-icon" src={Scooter} alt="1 - 1 Coaching (Lite)" />
                        </div>
                        <div className="pricing-card-body">
                            <h6 className="pricing-card-title">Lite</h6>
                            <div className="pricing-card-list">
                                <p>1 - 1 Coaching</p>
                                <p>Business Advisory</p>
                                <p>1 Hour</p>
                                <p>1 Teammate</p>
                                <p>BMC Review</p>
                                <p><i className="ti-close"></i></p>
                            </div>
                        </div>
                        <div className="pricing-card-footer">
                            <span>$</span>
                            <span>30/Hour</span>
                        </div>
                        <button className="btn btn-primary mt-3 pricing-card-btn" id="lite" onClick={() => setLite(true)}>Subscribe</button>


                    </div>
                    <div className="pricing-card">
                        <div className="pricing-card-header">
                            <img className="pricing-card-icon" src={Shipped} alt="1-1 Coaching (Basic)" />
                        </div>
                        <div className="pricing-card-body">
                            <h6 className="pricing-card-title">Basic</h6>
                            <div className="pricing-card-list">
                                <p>1 - 1 Coaching</p>
                                <p>Business Advisory</p>
                                <p>Up to 3 Hours</p>
                                <p>up to 5 Teammates</p>
                                <p>BMC Review</p>
                                <p>Deck and Pitch Review</p>
                            </div>
                        </div>
                        <div className="pricing-card-footer">
                            <span>$</span>
                            <span>80/Session</span>
                        </div>
                        <button className="btn btn-primary mt-3 pricing-card-btn" onClick={() => setBasic(true)}>Subscribe</button>
                    </div>
                    <div className="pricing-card">
                        <div className="pricing-card-header">
                            <img className="pricing-card-icon" src={Startup} alt="bootcamps" />
                        </div>
                        <div className="pricing-card-body">
                            <h6 className="pricing-card-title">Pro</h6>
                            <div className="pricing-card-list">
                                <p>All Basic Features +</p>
                                <p>Business Model Canvas</p>
                                <p>Operational Plan</p>
                                <p>Financial Plan</p>
                                <p>Business Plan</p>
                                <p>Pitch Deck</p>
                            </div>
                        </div>
                        <div className="pricing-card-footer">
                            <span>$</span>
                            <span>1500/Plan</span>
                        </div>
                        {/* <!-- <button className="btn btn-primary mt-3 pricing-card-btn" id="pro">Subscribe</button> --> */}

                        <button className="btn btn-primary mt-3 pricing-card-btn" id="pro" onClick={() => setPro(true)}>Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Lite Plan Modal */}
            <Modal
                title="Lite Plan"
                centered
                open={lite}
                onCancel={() => {
                    onReset()
                  setLite(false)}}
                width={"800px"}
                footer={null}
            >
                <Form
                    form={form}
                    initialValues={{ plan:'lite' }}
                    name="lite"
                    onFinish={formData}
                    layout="vertical"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                >

                    <Form.Item name="plan"  style={{ display: 'none'}}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="firstname" label="First name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter first name",
                            },
                        ]}>
                        <Input
                            placeholder='Enter first name'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="lastname" label="Last name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter last name",
                            },
                        ]}>
                        <Input
                            placeholder='Enter last name'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="company" label="Company Name (Optional)">
                        <Input
                            placeholder='Enter company Name'
                            className="inputWidthFull"
                        />
                    </Form.Item>


                    <Form.Item name="stage" label="Stage"
                        initialValue=''>
                        <Select
                            placeholder="Choose stage"
                        >
                            <Option value="Bootcamp">Idea, Prototype</Option>
                            <Option value="Incubator/Accelerator">MVP</Option>
                            <Option value="Hackathon/Ideathon">Post Revenue</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="canvass">
                        <Radio.Group
                            className="radio_button"
                            onChange={(e: RadioChangeEvent) => {
                                setCanvass(e.target.value)
                            }}
                            value={canvass}
                        >
                            <Radio value="no" >No</Radio>
                            <Radio value="yes">Yes</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {canvass ?
                        <Form.Item
                            name="canvass_upload"
                            valuePropName="fileList"
                            getValueFromEvent={addCanvass}
                            label="Upload Business Model Canvass"
                        >
                            <Upload name="canvass_upload"
                                listType="picture"
                                multiple>
                                <Button>Upload canvass</Button>
                            </Upload>
                        </Form.Item> :
                        ""
                    }
                    <Form.Item name="expectations"
                        style={{ gridColumn: '1/3' }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter first name",
                            },
                        ]}>
                        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                    </Form.Item>



                    <Form.Item style={{ gridColumn: '1/3' }}>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                        //     onClick={() => {
                        //         onReset()
                        //       setLite(false)
                        //   }}
                        >
                            
                            Make Payment
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => {
                                  onReset()
                                setLite(false)
                            }}
                        >
                            Close
                        </Button>
                    </Form.Item >

                </Form>
            </Modal>

            {/* Basic Plan Modal */}
            <Modal
                title="Basic Plan"
                centered
                open={basic}
                onCancel={() =>{
                    onReset()
                    setBasic(false)}}
                width={"800px"}
                footer={null}
            >
              <Form
                    form={form}
                    initialValues={{ plan:'basic' }}
                    name="basic"
                    onFinish={formData}
                    layout="vertical"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                >

                    <Form.Item name="plan" style={{ display: 'none'}} >
                        <Input />
                    </Form.Item>

                    <Form.Item name="firstname" label="First name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter first name",
                            },
                        ]}>
                        <Input
                            placeholder='Enter first name'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="lastname" label="Last name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter last name",
                            },
                        ]}>
                        <Input
                            placeholder='Enter last name'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="company" label="Company Name (Optional)">
                        <Input
                            placeholder='Enter company Name'
                            className="inputWidthFull"
                        />
                    </Form.Item>


                    <Form.Item name="stage" label="Stage"
                        initialValue=''>
                        <Select
                            placeholder="Choose stage"
                        >
                            <Option value="Bootcamp">Idea, Prototype</Option>
                            <Option value="Incubator/Accelerator">MVP</Option>
                            <Option value="Hackathon/Ideathon">Post Revenue</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="canvass"
                      label="Upload Business Model Canvass"
                      >
                        <Radio.Group
                            className="radio_button"
                            onChange={(e: RadioChangeEvent) => {
                                setCanvass(e.target.value)
                            }}
                            value={canvass}
                        >
                            <Radio value="no" >No</Radio>
                            <Radio value="yes">Yes</Radio>
                        </Radio.Group>
                    </Form.Item>

                     <Form.Item name="pitch" label="Do you have a pitch deck?">
                        <Radio.Group
                            className="radio_button"
                            onChange={(e: RadioChangeEvent) => {
                                setPitch(e.target.value)
                            }}
                            value={pitch}
                        >
                            <Radio value="no" >No</Radio>
                            <Radio value="yes">Yes</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {canvass === "yes" &&
                        <Form.Item
                            name="canvass-upload"
                            valuePropName="fileList"
                            getValueFromEvent={addCanvass}
                            label="Do you have a Business Model Canvass?"
                        >
                            <Upload name="canvass-upload"
                                listType="picture"
                                multiple>
                                <Button>Upload canvass</Button>
                            </Upload>
                        </Form.Item>
                    }
                    {pitch === "yes" &&
                        <Form.Item
                            name="pitch-upload"
                            valuePropName="fileList"
                            getValueFromEvent={addCanvass}
                            label="Upload Pitch Deck"
                        >
                            <Upload name="pitch-upload"
                                listType="picture"
                                multiple>
                                <Button>Upload Pitch</Button>
                            </Upload>
                        </Form.Item> }
                    <Form.Item name="expectations"
                        style={{ gridColumn: '1/3' }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter first name",
                            },
                        ]}>
                        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                    </Form.Item>



                    <Form.Item style={{ gridColumn: '1/3' }}>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                        //     onClick={() => {
                        //         onReset()
                        //       setBasic(false)
                        //   }}
                        >
                            Make Payment
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => {
                                  onReset()
                                setBasic(false)
                            }}
                        >
                            Close
                        </Button>
                    </Form.Item >

                </Form>
            </Modal>

            {/* Pro Plan Modal */}
            <Modal
                title="Pro Plan"
                centered
                open={pro}
                onCancel={() => {
                    onReset()
                    setPro(false)}}
                width={"800px"}
                footer={null}
            >
                <Form
                    form={form}
                    initialValues={{ plan:'pro' }}
                    name="pro"
                    onFinish={formData}
                    layout="vertical"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                >

                    <Form.Item name="plan"  style={{ display: 'none'}}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="type" label="Type"
                        initialValue='{coupon.type}'>
                        <Select
                            placeholder="Type"
                        >
                            <Option value="percentage">Percentage</Option>
                            <Option value="amount">Amount</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="min_amount" label="Minimum amount"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter a minimum amount!",
                    //   },
                    // ]}
                    >
                        <InputNumber
                            placeholder='{coupon.min_amount}'
                            className="inputWidthFull"
                            label="Minimum amount"
                        />
                    </Form.Item>

                    <Form.Item name="status" label="Status"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Select a status!",
                    //   },
                    // ]}
                    >
                        <Select
                            // placeholder="Status"
                            defaultValue='{coupon.status}'
                        >
                            <Option value="active">Activate</Option>
                            <Option value="disabled">Deactivate</Option>
                        </Select>
                    </Form.Item>

                    {/* <Form.Item name="categories" label="Categories" >

              <Select
                mode="multiple"
                placeholder="Choose category"
                defaultValue={category && category.map((item) => {
                  return item.id
                })}
              >
                {categories && categories.map((category, index) => (
                  <Option key={index} value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </Form.Item> */}




                    <Form.Item style={{ gridColumn: '1/3' }}>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                        //     onClick={() => {
                        //         onReset()
                        //       setPro(false)
                        //   }}
                        >
                            Make Payment
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => {
                                  onReset()
                                setPro(false)
                            }}
                        >
                            Close
                        </Button>
                    </Form.Item >

                </Form>
            </Modal>

                        {/* Payment */}
                        <Modal
                title="Payment Instruction"
                centered
                open={payment}
                width={"800px"}
                footer={null}
            >
                <div class="">
    <p class="form-header" id="payment-title">Basic Plan</p>
    <p class="notes">Please make a payment of <span>${bill}</span> to the following account with the reference number below as description for the payment.</p>
    <p class="accountText">Account number: <span>20937937947</span></p>
    <p class="accountText">Account name: <span>Jimoh abdulwahab</span></p>
    <p class="accountText">Reference number: <span>{refId}</span>
     <CopyToClipboard text={refId ? refId : "RefNumbe"} onCopy={()=>setCopy(true)}><button className='copyToClip'>Copy</button></CopyToClipboard>
    </p>
</div>
                 <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                            onClick={() => {
                                setPayment(false)
                                setSchedule(true)
                          }}
                        >
                            Schedule date
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => setPayment(false)}
                        >
                            Close
                        </Button>
            </Modal>

                                    {/* Schedule meeting */}
                                    <Modal
                title="Schedule"
                centered
                open={schedule}
                width={"800px"}
                footer={null}
            >
           {/* <form name="calendarForm" id="calendarForm">
                    <div class="form-row">

                    
                    <div class="zcEmtp">
                        <div class="zcEmt">Your name</div>
                        <input name="name" id="name" type="text"  required />
                    </div>
                    <div class="zcEmtp">
                        <div class="zcEmt">Email address</div>
                        <input name="email" id="email" type="text" required />
                    </div>
                    <div class="zcEmtp">
                        <div class="zcEmt">Date &amp; Time</div>
                        <input name="date" id="zcl_date" type="date"/>
                    </div>
                    <div class="">
                        <select class="zcl_small" id="time" name="time">
                            <option value="00:00">12:00 am</option>
                            <option value="00:30">12:30 am</option>
                            <option value="01:00">01:00 am</option>
                            <option value="01:30">01:30 am</option>
                            <option value="02:00">02:00 am</option>
                            <option value="02:30">02:30 am</option>
                            <option value="03:00">03:00 am</option>
                            <option value="03:30">03:30 am</option>
                            <option value="04:00">04:00 am</option>
                            <option value="04:30">04:30 am</option>
                            <option value="05:00">05:00 am</option>
                            <option value="05:30">05:30 am</option>
                            <option value="06:00">06:00 am</option>
                            <option value="06:30">06:30 am</option>
                            <option value="07:00">07:00 am</option>
                            <option value="07:30">07:30 am</option>
                            <option value="08:00">08:00 am</option>
                            <option value="08:30">08:30 am</option>
                            <option value="09:00">09:00 am</option>
                            <option value="09:30">09:30 am</option>
                            <option value="10:00" selected="">10:00 am</option>
                            <option value="10:30">10:30 am</option>
                            <option value="11:00">11:00 am</option>
                            <option value="11:30">11:30 am</option>
                            <option value="12:00">12:00 pm</option>
                            <option value="12:30">12:30 pm</option>
                            <option value="13:00">01:00 pm</option>
                            <option value="13:30">01:30 pm</option>
                            <option value="14:00">02:00 pm</option>
                            <option value="14:30">02:30 pm</option>
                            <option value="15:00">03:00 pm</option>
                            <option value="15:30">03:30 pm</option>
                            <option value="16:00">04:00 pm</option>
                            <option value="16:30">04:30 pm</option>
                            <option value="17:00">05:00 pm</option>
                            <option value="17:30">05:30 pm</option>
                            <option value="18:00">06:00 pm</option>
                            <option value="18:30">06:30 pm</option>
                            <option value="19:00">07:00 pm</option>
                            <option value="19:30">07:30 pm</option>
                            <option value="20:00">08:00 pm</option>
                            <option value="20:30">08:30 pm</option>
                            <option value="21:00">09:00 pm</option>
                            <option value="21:30">09:30 pm</option>
                            <option value="22:00">10:00 pm</option>
                            <option value="22:30">10:30 pm</option>
                            <option value="23:00">11:00 pm</option>
                            <option value="23:30">11:30 pm</option>
                        </select>
                    </div>
                                     <div class="zcEmtp">
                        <div class="zcEmt">Reference Number</div>
                        <input name="reference" id="calendarReference" value=""/>
                    </div>
                    <div class="form-group mt-3">
                        <button type="submit" name="submit" id="schedule" class="btn btn-outline-primary rounded">Schedule</button>
                    </div>
                </div>
                </form> */}
                <DatePicker
        isOpen={schedule}
        // onClose={() => setIsOpen(false)}
        defaultValue={new Date(2022, 8, 8)}
        minDate={new Date(2022, 10, 10)}
        maxDate={new Date(2023, 0, 10)}
        headerFormat='DD, MM dd'
      />
                 <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                            onClick={() => {
                                setPayment(false)
                                setSchedule(true)
                          }}
                        >
                            Schedule date
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => setPayment(false)}
                        >
                            Close
                        </Button>
            </Modal>
        </section>
    )
}

export default Pricing