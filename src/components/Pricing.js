// import 'whatwg-fetch';
import React, { useEffect, useState } from 'react'
import '../App.css';
import Scooter from "../imgs/scooter.svg"
import Shipped from "../imgs/shipped.svg"
import Startup from "../imgs/startup.svg"
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Form, Input, InputNumber, Modal, Select, Upload, RadioChangeEvent, Radio, DatePicker } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import moment from 'moment/moment';



function Pricing(props) {
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';

    const [loading, setLoading] = useState(false)
    const [lite, setLite] = useState(false)
    const [basic, setBasic] = useState(false)
    const [pro, setPro] = useState(false)
    const [fields, setFields] = useState({})
    const [payment, setPayment] = useState(false)
    const [schedule, setSchedule] = useState(false)
    const [copy, setCopy] = useState(false)
    const [bill, setBill] = useState('')
    const [refId, setRefId] = useState('')
    const [plan, setPlan] = useState('')
    const [canvass, setCanvass] = useState(false)
    const [pitch, setPitch] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [name, setName] = useState("")

    // SCRIPT TO UPLOAD IMAGE TO CLOUDINARY
    const [uploadCanvassFile, setUploadCanvassFile] = useState("");
    const [canvassUpload, setCanvassUpload] = useState("")
    const [pitchUpload, setPitchUpload] = useState("")
    const [uploadPitchFile, setUploadPitchFile] = useState("");


    
    useEffect(() => {
        const formData = new FormData();
        formData.append("file", uploadPitchFile);
        formData.append("upload_preset", "ecokpala");

        axios.post(
            "https://api.cloudinary.com/v1_1/degoanwyh/image/upload",
            formData
        )
            .then((response) => {
                console.log(response.data.secure_url);
                setPitchUpload(response.data.secure_url);
                return response.data.secure_url;
            })
            .catch((error) => {
                console.log(error);
            });
        
    }, [uploadPitchFile !== ""])

    useEffect(() => {
        const formData = new FormData();
        formData.append("file", uploadCanvassFile);
        formData.append("upload_preset", "ecokpala");

        axios.post(
            "https://api.cloudinary.com/v1_1/degoanwyh/image/upload",
            formData
        )
            .then((response) => {
                console.log(response.data.secure_url);
                setCanvassUpload(response.data.secure_url);
                return response.data.secure_url;
            })
            .catch((error) => {
                console.log(error);
            });
        
    }, [uploadCanvassFile !== ""])


    // const addPitch = (e) => {
    //     console.log(e)
    //     const formData = new FormData();
    //     formData.append("file", e);
    //     formData.append("upload_preset", "ecokpala");

    //     axios.post(
    //         "https://api.cloudinary.com/v1_1/degoanwyh/image/upload",
    //         formData
    //     )
    //         .then((response) => {
    //             console.log(response.data.secure_url);
    //             // setCloudinaryImage(response.data.secure_url);
    //             return response.data.secure_url;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
        
    // };

    const onReset = () => {
        form.resetFields();
    };
    const handleErrors = (response) => {
        if (!response.ok)
            throw Error(response.statusText);
        return response;
    }

    const checkForm = (value) => {

        //     let fields = {
        //         firstname: value.firstname,
        //         lastname: value.lastname,
        //         company: value.company,
        //         canvass: value.canvass,
        //         "canvass-upload": value.canvass_upload[0].thumbUrl,
        //         stage: value.stage,
        //         plan: value.plan,
        //         expectations: value.expectations
        //     }
        // console.log(fields)
        console.log(value)
        // formShow(alues)
    };

    const liteForm = (value) => { 
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company,
            canvass: value.canvass,
            "canvass-upload": canvassUpload ? canvassUpload : '',
            stage: value.stage,
            plan: value.plan,
            expectations: value.expectations
        }
        formData(fields)
        console.log(fields)
        let referenceID = fields.plan + fields.company + Math.floor(Math.random() * 999)
        setRefId(referenceID)
        // setPayment(true)
        setLite(false)
        setBill(30)
        console.log(fields)
        setPlan(fields.plan)
        setName(`${fields.firstname} ${fields.lastname}`)
    };
    const basicForm = (value) => {
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company,
            canvass: value.canvass,
            "canvass-upload": canvassUpload ? canvassUpload : '',
            pitch: value.pitch,
            "pitch-upload": pitchUpload ? pitchUpload : '',
            stage: value.stage,
            plan: value.plan,
            expectations: value.expectations,
        }
        formData(fields)
        // setPayment(true)
        console.log(fields)
        let referenceID = fields.plan + fields.company + Math.floor(Math.random() * 999)
        setRefId(referenceID)
        setBasic(false)
        setBill(80)
        console.log(fields)
        setPlan(fields.plan)
        setName(`${fields.firstname} ${fields.lastname}`)
    };
    const proForm = (value) => {
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company,
            audience: value.audience,
            mode: value.mode,
            address: value.address,
            link: value.link,
            "start-date": startDate,
            "end-date": endDate,
            stage: value.stage,
            plan: value.plan,
            expectations: value.expectations,
            others: value.others

        }
        formData(fields)
        console.log(fields)
        // setPayment(true)
        let referenceID = fields.plan + fields.company + Math.floor(Math.random() * 999)
        setRefId(referenceID)
        setPro(false)
        setBill(1500)
        console.log(fields)
        setPlan(fields.plan)
        setName(`${fields.firstname} ${fields.lastname}`)
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

                }, { headers: headers_ }
            )
                .then((resp) => {
                    console.log("success!")
                    setPayment(true)
                    onReset()
                        // setRefId(fields.plan + fields.company + Math.floor(Math.random() * 999))
                        (fields.plan === "lite" ? (setLite(false), setBill(30)) :
                            fields.plan === "basic" ? (setBasic(false), setBill(80)) :
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

    const calendarData = async (value) => {
        try {
            setLoading(true);

            const headers_ = {
                Authorization: 'Bearer ya29.a0AWY7CknPzzvLpOgWa3Nd9EOGyRyyCHOMI2_sG41j2AGY2VMw2Fc9qkQUpF-F3KO90fVLfF1tqQ5yAs-lPWh_Uzb_7MjjyVYKrojhVZOcm-VuRt2CawX6RW0JV1i7N8ghBjoPfCTLaKDU7Fo2-oWM0Zqny2RibQaCgYKAQkSARMSFQG1tDrpAdsdUD5SaxrERhxRk0O-_A0165',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            };
            axios.post("https://www.googleapis.com/calendar/v3/calendars/159d66ab8b0100f347b9fdc90e62f092bc8005f0e7feed7c0c5bbca647a29543@group.calendar.google.com/events",
                {
                    start: {
                        dateTime: value.startDate,
                        timeZone: "Africa/Lagos"
                    },
                    end: {
                        dateTime: value.endDate,
                        timeZone: "Africa/Lagos"
                    },
                    attendees: [{email: value.email}],
                    reference_ID: value.refId,
                    title: value.title,
                    name: value.name
                }, { headers: headers_ }
            )
                .then((resp) => {
                                onReset()
                                setSchedule(false)
                }).catch((error) => {
                    return handleErrors(error);
                })
        } finally {
            setLoading(false);

        }
    };

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
                    setLite(false)
                }}
                width={"800px"}
                footer={null}
            >
                <Form
                    form={form}
                    initialValues={{ plan: 'lite' }}
                    name="lite"
                    // onFinish={checkForm}
                    onFinish={liteForm}
                    layout="vertical"
                    className='formGrid'
                    // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                >

                    <Form.Item name="plan" style={{ display: 'none' }}>
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
                    <Form.Item name="canvass" initialValue='yes'
                      label="Do you have Business Model Canvass">
                        <Radio.Group
                            className="radio_button"
                            defaultValue="yes"
                            onChange={(e: RadioChangeEvent) => {
                                e.target.value === "yes" ? setCanvass(false) : setCanvass(true)
                            }}
                            value={canvass}
                        >
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no" >No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div  className='uploadInput'>   
                    <p className='textLabel'>Upload Business Model Canvass</p>
                    <input type="file"
                     disabled={canvass}

                            onChange={(event) => (setUploadCanvassFile(event.target.files[0])
                                )}
                        />
                        </div>
                   
                    <Form.Item name="expectations"
                        label="Expectations" style={{ gridColumn: '1/3' }}>
                        <TextArea rows={4} placeholder="What are your expectations" />
                    </Form.Item>



                    <Form.Item style={{ gridColumn: '1/3' }}>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                      
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
                onCancel={() => {
                    onReset()
                    setBasic(false)
                }}
                width={"800px"}
                footer={null}
            >
                <Form
                    form={form}
                    initialValues={{ plan: 'basic' }}
                    name="basic"
                    // onFinish={formData}
                    onFinish={basicForm}
                    layout="vertical"
                    className='formGrid'
                    // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                >

                    <Form.Item name="plan" style={{ display: 'none' }} >
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
                    <Form.Item name="canvass" initialValue='yes'
                        label="Do you have Business Model Canvass"
                    >
                        <Radio.Group
                            className="radio_button"
                            defaultValue='yes'
                            onChange={(e: RadioChangeEvent) => {
                                // setCanvass(e.target.value)
                                e.target.value === "yes" ? setCanvass(false) : setCanvass(true)
                            }}
                            value={canvass}
                        >
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no" >No</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div className='uploadInput'>   
                    <p className='textLabel'>Upload Business Model Canvass</p>
                     <input type="file"
                     disabled={canvass}
                            onChange={(event) => (setUploadCanvassFile(event.target.files[0])
                                )}
                        />
                        </div>

                    <Form.Item name="pitch" initialValue='yes'
                        label="Do you have a pitch deck?">
                        <Radio.Group
                            className="radio_button"
                            defaultValue='yes'
                            onChange={(e: RadioChangeEvent) => {
                                e.target.value === "yes" ? setPitch(false) : setPitch(true)
                            }}
                            value={pitch}
                        >
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no" >No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div className='uploadInput'>   
                    <p className='textLabel'> Upload pitch deck</p>
                    <input type="file"
                     disabled={canvass}
                            onChange={(event) => (setUploadPitchFile(event.target.files[0])
                                )}
                        />
</div>

                    <Form.Item name="expectations"
                        label="Expectations" style={{ gridColumn: '1/3' }}>
                        <TextArea rows={4} placeholder="What are your expectations" maxLength={6} />
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
                    setPro(false)
                }}
                width={"800px"}
                footer={null}
            >
                <Form
                    form={form}
                    initialValues={{ plan: 'pro' }}
                    name="pro"
                    onFinish={proForm}
                    // onFinish={formData}
                    layout="vertical"
                    className='formGrid'
                    // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                >

                    <Form.Item name="plan" style={{ display: 'none' }} >
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


                    <Form.Item name="event-type" label="Event Type"
                        rules={[
                            {
                                required: true,
                                message: "Please select the event type"
                            }
                        ]}>
                        <Select
                            placeholder='Select event type'
                        >
                            <Option value="Bootcamp">Bootcamp</Option>
                            <Option value="Incubator/Accelerator">Incubator/Acceleratore</Option>
                            <Option value="Hackathon/Ideathon">Hackathon/Ideathon</Option>
                            <Option value="Training/Workshops">Training/Workshops</Option>
                            <Option value="Seminars/Conference">Seminars/Conference</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item name="start_date"
                        label="Start date"
                        rules={[
                            {
                                required: true,
                                message: "What's the start date",
                            },
                        ]}
                    >
                        <DatePicker onChange={e => setStartDate(moment(e).format(
                            "MMM D, YYYY"
                        ))} />
                    </Form.Item>
                    <Form.Item name="end_date"
                        label="End date"
                        rules={[
                            {
                                required: true,
                                message: "What's the end date",
                            },
                        ]}
                    >
                        <DatePicker onChange={e => setEndDate(moment(e).format(
                            "MMM D, YYYY"
                        ))} />
                    </Form.Item>

                    <Form.Item name="mode" label="Event Mode"
                        rules={[
                            {
                                required: true,
                                message: "Please select the event mode"
                            }
                        ]}>
                        <Select
                            placeholder='Select event mode'
                        >
                            <Option value="hybrid">Hybrid</Option>
                            <Option value="physical">Physical</Option>
                            <Option value="online">Online</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="audience" label="Number of participants">
                        <InputNumber min={1} max={99999} defaultValue={10} />
                    </Form.Item>

                    <Form.Item name="address" label="Enter address">
                        <Input
                            placeholder='Address'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="link" label="Event Url">
                        <Input
                            placeholder='www.example.com'
                            className="inputWidthFull"
                        />
                    </Form.Item>


                    <Form.Item name="expectations"
                        label="Expectations" style={{ gridColumn: '1/3' }}>
                        <TextArea rows={6} placeholder="What are your expectations" />
                    </Form.Item>
                    <Form.Item name="others"
                        label="Others" style={{ gridColumn: '1/3' }}>
                        <TextArea rows={6} placeholder="Other expectations" />
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

            {/* Payment */}
            <Modal
                title="Payment Instruction"
                centered
                open={payment}
                width={"800px"}
                footer={null}
                onCancel={()=>setPayment(false)}
            >
                <div class="">
                    <p class="form-header" style={{ textTransform: "Capitalize" }} id="payment-title">{plan} Plan</p>
                    <p class="notes">Please make a payment of <span style={{fontWeight: "700"}}>${bill}</span> to the following account with the reference number below as description for the payment.</p>
                    <p class="accountText">Account number: <span>20937937947</span></p>
                    <p class="accountText">Account name: <span>Jimoh abdulwahab</span></p>
                    <p class="accountText">Reference number: <span style={{ marginRight: '20px' }}>{refId}</span>
                        <CopyToClipboard text={refId ? refId : "RefNumber"} onCopy={() => setCopy(true)}><button className='copyToClip'>Copy</button></CopyToClipboard>
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
                title='Schedule'
                centered
                // open={Props.info?.schedule}
                open={schedule}
                width={"fit-content"}
                footer={null}
                onCancel={()=>setSchedule(false)}

            >
                {/* <AddCal /> */}

                <Form
                    form={form}
                    initialValues={{refId: refId, name: name}}
                    // name="calendar"
                    onFinish={calendarData}
                    layout="vertical"
                    className='formGrid'
                    // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                >


                    <Form.Item name="name" label="Fullname"
                    initialValue={name}
                    >
                        <Input
                            disabled = {true}
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="refId" label="Reference ID"
                    initialValue={refId}
                    >
                        <Input
                        disabled = {true}
                            // placeholder='Enter title'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item style={{ gridColumn: '1/3' }}
                     name="email" label="Email address">
                        <Input
                            placeholder='Email address'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="startDate"
                        label="Start date"
                        rules={[
                            {
                                required: true,
                                message: "What's the start date",
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="endDate"
                        label="End date"
                        rules={[
                            {
                                required: true,
                                message: "What's the end date",
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>



                    <Form.Item style={{ gridColumn: '1/3' }}>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                        >

                            Schedule
                        </Button>
                        {/* <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => {
                                onReset()
                                setSchedule(false)
                            }}
                        >
                            Cancel
                        </Button> */}
                    </Form.Item >

                </Form>


            </Modal>

        </section>
    )
}

export default Pricing