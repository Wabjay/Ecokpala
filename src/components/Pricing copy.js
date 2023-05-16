// import 'whatwg-fetch';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import '../App.css';
import Scooter from "../imgs/scooter.svg"
import Shipped from "../imgs/shipped.svg"
import Startup from "../imgs/startup.svg"
import axios from 'axios';
import randomstring from 'randomstring'
import countryList from 'react-select-country-list';
import { Button, Form, Input, InputNumber, Modal, Select, Upload, RadioChangeEvent, Radio, DatePicker, Spin, Alert, message, notification } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import moment from 'moment/moment';



function Pricing(props) {
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;
    const options = useMemo(() => countryList().getData(), [])
    const canvassRef = useRef()
    const pitchRef = useRef()



    const changeHandler = value => {
        setCountry(value)
        console.log(value)
    }

    const [loading, setLoading] = useState(false)
    const [lite, setLite] = useState(false)
    const [basic, setBasic] = useState(false)
    const [pro, setPro] = useState(false)
    const [country, setCountry] = useState('NG')
    const [ng, setNg] = useState('Nigeria')
    const [no, setNo] = useState('no')
    const [canvass, setCanvass] = useState(true)
    const [pitch, setPitch] = useState(true)

    // SCRIPT TO UPLOAD IMAGE TO CLOUDINARY
    const [canvassUpload, setCanvassUpload] = useState("")
    const [pitchUpload, setPitchUpload] = useState("")
    const [resetValue, setReset] = useState(false)





    const PitchFile = async (uploadPitchFile) => {
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
    }


    const CanvassFile = async (uploadCanvassFile) => {
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
                setCanvassUpload(uploadCanvassFile.name);

            });
    }


    const onReset = () => {
        form.resetFields();
        canvassRef.current.value = "";
        pitchRef.current.value = ""
        setCanvass(true)
        setPitch(true)
        setNg('Nigeria')
        setNo('no')
    };
    // const reset = () => {
    //     ref.current.value = ""
    // }
    const handleErrors = (response) => {
        if (!response.ok)
            throw Error(response.statusText);
        return response;
    }

    const liteForm = (value) => {
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company,
            canvass: value.canvass,
            "canvass-upload": canvassUpload ? canvassUpload : '',
            stage: value.stage,
            plan: value.plan,
            expectations: value.expectations,
            reference: value.plan + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
            bill: 30,
            country: country,
            email: value.email
        }
        // formData(fields)
        console.log(fields)
        // setRefId(fields.reference)
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
            reference: value.plan + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
            bill: 81,
            country: country,
            email: value.email
        }
        // formData(fields)
        console.log(fields)
        // setRefId(fields.reference)
    };
    const proForm = (value) => {
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
            others: value.others,
            reference: value.plan + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
            bill: 1500,
            country: country === country,
            email: value.email
        }
        // formData(fields)
        console.log(fields)
        // setRefId(fields.reference)
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
                    setLoading(false);
                    notification.success({
                        message: "Form submitted",
                        description: "Thank you, You will recieve an email with the payment instruction!.",
                    })
                    setPitchUpload("")
                    setCanvassUpload("")
                    onReset()
                        (fields.plan === "lite" ? setLite(false) : fields.plan === "basic" ? setBasic(false) : setPro(false))
                    console.log(fields)
                    // console.log(reference);
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
                                <p>X</p>
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
                {/* {loading &&
                    <div className='spinner'>
                        <Spin size='large' />
                    </div>} */}
                <Form
                    form={form}
                    initialValues={{ plan: 'lite' }}
                    name="lite"
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


                    <Form.Item name="email" label="Email address"
                        rules={[
                            {
                                required: true,
                                message: "Please enter email address",
                            },
                        ]}>
                        <Input
                            placeholder='Email address'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="country" label="Country of residence"
                        // initialValue={ng}
                        rules={[
                            {
                                required: true,
                                message: "Choose a country of residence",
                            }
                        ]}>
                        <Select
                        placeholder="Country of residence"
                        options={options} value={options} onChange={changeHandler} />
                    </Form.Item>


                    <Form.Item name="company" label="Company Name">
                        <Input
                            placeholder='Enter company Name'
                            className="inputWidthFull"
                        />
                    </Form.Item>


                    <Form.Item name="stage" label="Stage"
                        initialValue=''
                        rules={[
                            {
                                required: true,
                                message: "Select a stage",
                            },
                        ]}>
                        <Select
                            placeholder="Choose stage"
                        >
                            <Option value="Idea">Idea</Option>
                            <Option value="Prototype">Prototype</Option>
                            <Option value="MVP">MVP</Option>
                            <Option value="Post Revenue">Post Revenue</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="canvass" 
                    initialValue=''
                        label="Do you have Business Model Canvass" 
                        rules={[
                            {
                                required: true,
                                message: "Do you have Business Model Canvass",
                            },
                        ]}>
                        <Radio.Group
                            className="radio_button"
                            initialValues=""
                            onChange={(e: RadioChangeEvent) => {
                                e.target.value === "yes" ? setCanvass(false) : setCanvass(true)
                            }}
                            // value={canvass}
                        >
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no" >No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div className='uploadInput'>
                        <p className='textLabel'>Upload Business Model Canvass</p>
                        <input type="file"
                            required
                            disabled={canvass}
                            onChange={(event) => (CanvassFile(event.target.files[0])
                            )}
                            ref={canvassRef}
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

                            Submit
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => {
                                onReset()
                                setLite(false)
                                // reset
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

                    <Form.Item name="email" label="Email address"
                        rules={[
                            {
                                required: true,
                                message: "Please enter email address",
                            },
                        ]}>
                        <Input
                            placeholder='Email address'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="country" label="Country of residence"
                        // initialValue={ng}
                        rules={[
                            {
                                required: true,
                                message: "Select your country of residence",
                            },
                        ]}>
                        <Select 
                        placeholder="Country of residence"
                        options={options} value={options} onChange={changeHandler} />
                    </Form.Item>

                    <Form.Item name="company" label="Company Name">
                        <Input
                            placeholder='Enter company Name'
                            className="inputWidthFull"
                        />
                    </Form.Item>


                    <Form.Item name="stage" label="Stage"
                        initialValue=''
                        rules={[
                            {
                                required: true,
                                message: "Choose a stage",
                            },
                        ]}>
                        <Select
                            placeholder="Choose stage"
                        >
                            <Option value="Idea">Idea</Option>
                            <Option value="Prototype">Prototype</Option>
                            <Option value="MVP">MVP</Option>
                            <Option value="Post Revenue">Post Revenue</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="canvass" initialValue={no}
                        label="Do you have Business Model Canvass"
                        rules={[
                            {
                                required: true,
                                message: "Do you have Business Model Canvass",
                            },
                        ]}
                    >
                        <Radio.Group
                            className="radio_button"
                            initialValue={no}
                            onChange={(e: RadioChangeEvent) => {
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
                            required
                            disabled={canvass}
                            onChange={(event) => (CanvassFile(event.target.files[0])
                            )}
                            ref={canvassRef}
                        />
                    </div>

                    <Form.Item name="pitch" initialValue={no}
                        label="Do you have a pitch deck?"
                        rules={[
                            {
                                required: true,
                                message: "Do you have a pitch deck?",
                            },
                        ]}>
                        <Radio.Group
                            className="radio_button"
                            initialValue={no}
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
                            required
                            disabled={pitch}
                            onChange={(event) => (
                                PitchFile(event.target.files[0])
                            )}
                            ref={pitchRef}
                        />
                    </div>

                    <Form.Item name="expectations"
                        label="Expectations" style={{ gridColumn: '1/3' }}>
                        <TextArea rows={4} placeholder="What are your expectations"  />
                    </Form.Item>



                    <Form.Item style={{ gridColumn: '1/3' }}>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="mt-2"
                            type="primary"
                        >
                            Submit
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => {
                                onReset()
                                setBasic(false)
                    //             setPitchUpload("")
                    // setCanvassUpload("")
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
                    <Form.Item name="email" label="Email address"
                        rules={[
                            {
                                required: true,
                                message: "Please enter email address",
                            },
                        ]}>
                        <Input
                            placeholder='Email address'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="country" label="Country of residence"
                        // initialValue={ng}
                        rules={[
                            {
                                required: true,
                                message: "Select your country of residence",
                            },
                        ]}>
                        <Select
                        placeholder="Nigeria" options={options} value={options} onChange={changeHandler} />
                    </Form.Item>


                    <Form.Item name="company" label="Company Name">
                        <Input
                            placeholder='Enter company Name'
                            className="inputWidthFull"
                        />
                    </Form.Item>


                    <Form.Item name="stage" label="Stage"
                        initialValue=''
                        rules={[
                            {
                                required: true,
                                message: "Choose a stage",
                            },
                        ]}>
                        <Select
                            placeholder="Choose stage"
                        >
                            <Option value="Idea">Idea</Option>
                            <Option value="Prototype">Prototype</Option>
                            <Option value="MVP">MVP</Option>
                            <Option value="Post Revenue">Post Revenue</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="canvass" initialValue={no}
                        label="Do you have Business Model Canvass"
                        rules={[
                            {
                                required: true,
                                message: "Do you have a Business Model Canvass?",
                            },
                        ]}
                    >
                        <Radio.Group
                            className="radio_button"
                            initialValue={no}
                            onChange={(e: RadioChangeEvent) => {
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
                            required
                            disabled={canvass}
                            onChange={(event) => (CanvassFile(event.target.files[0])
                            )}
                            ref={canvassRef}
                        />
                    </div>

                    <Form.Item name="pitch" initialValue={no}
                        label="Do you have a pitch deck?"
                        rules={[
                            {
                                required: true,
                                message: "Do you have a pitch deck?",
                            },
                        ]}>
                        <Radio.Group
                            className="radio_button"
                            initialValue={no}
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
                            required
                            disabled={pitch}
                            onChange={(event) => (
                                PitchFile(event.target.files[0])
                            )}
                            ref={pitchRef}
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
                            Submit
                        </Button>
                        <Button
                            className="mt-2 mx-3"
                            type="primary"
                            onClick={() => {
                                onReset()
                                setPro(false)
                    //             setPitchUpload("")
                    // setCanvassUpload("")
                    // setReset(e.target.value = null)
                            }}
                        >
                            Close
                        </Button>
                    </Form.Item >

                </Form>
            </Modal>


        </section>
    )
}

export default Pricing