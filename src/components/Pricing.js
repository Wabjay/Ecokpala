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
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import useMessage from 'antd/es/message/useMessage';



function Pricing(props) {
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;
    const options = useMemo(() => countryList().getData(), [])

    const [messageApi, contextHolder] = useMessage();


    const changeHandler = value => {
        setCountry(value)
        console.log(value)
    }

    const [loading, setLoading] = useState(false)
    const [lite, setLite] = useState(false)
    const [basic, setBasic] = useState(false)
    const [pro, setPro] = useState(false)
    const [country, setCountry] = useState('NG')
    const [canvassFile, setCanvassFile] = useState({})
    const [pitchFile, setPitchFile] = useState({})
    const [canvass, setCanvass] = useState(true)
    const [pitch, setPitch] = useState(true)
    const [refId, setRefId] = useState(undefined)
    const [send, setSend] = useState(false)
    const [field, setField] = useState({})
    // SCRIPT TO UPLOAD IMAGE TO CLOUDINARY
    const [canvassUpload, setCanvassUpload] = useState("")
    const [pitchUpload, setPitchUpload] = useState("")





    useEffect(() => {
        setLoading(true)
        if (pitchFile == null || pitchFile.status === "removed"  || pitchFile.name === undefined || pitch) return (setPitchUpload(""), setLoading(false));
        console.log(pitchFile, refId)
        const imageRef = ref(storage, `files/${refId + pitchFile.name}`);
        uploadBytes(imageRef, pitchFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setPitchUpload(url);
                setLoading(false)
                console.log(url)
            });
        });
    },[pitchFile, pitch]);

    useEffect(() => {
        setLoading(true)
        if (canvassFile == null || canvassFile.status === "removed" || canvassFile.name === undefined || canvass) return (setCanvassUpload(""), setLoading(false));
        console.log(canvassFile, refId)
        const imageRef = ref(storage, `files/${refId + canvassFile.name}`);
        uploadBytes(imageRef, canvassFile)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setCanvassUpload(url);
                        setLoading(false)
                        console.log(url)
                    });

            });
    },[canvassFile, canvass])


    const onReset = () => {
        form.resetFields();
        setCanvass(true)
        setPitch(true)
        setCanvassFile({})
        setPitchFile({})
        setRefId(undefined)
        setSend(false)
        setField({})
    };
    
    useEffect(() => {
        if (field.plan === "lite") {
            if (canvassUpload === "" && !canvass) {
                send && console.log("Please upload a canvass")
                setSend(false)
                send && messageApi.open({
                    type: 'error',
                    content: 'Please upload your canvass.',
                    className: 'custom-class',
                    duration: 1.5,
                    style: {
                        marginTop: '20vh',
                    },
                });
            } else if (canvassUpload !== "" && !canvass) {
                send && console.log(JSON.stringify(field));
                setSend(false)
                send && formData(field)
            } else if (canvassUpload === "" && canvass) {
                send && console.log(JSON.stringify(field));
                setSend(false)
                send && formData(field)
            }
        }
    }, [!send])
 
 
 // FOR BASIC AND PRO
     useEffect(() => {
         if (field.plan === "basic" || field.plan === "pro") {
             console.log(send)
             if ((pitchUpload === "" && !pitch && canvassUpload === "" && !canvass)) {
                 send && console.log("Please upload your canvass and pitch")
                 setSend(false)
                 send &&  messageApi.open({
                     type: 'error',
                     content: 'Please upload your canvass and pitch.',
                     className: 'custom-class',
                     duration: 1.5,
                     style: {
                         marginTop: '20vh',
                     },
                 });
             } else if (canvassUpload === "" && !canvass) {
                 send && console.log("loading: " + JSON.stringify(canvassFile));
                 setSend(false)
                 send &&  messageApi.open({
                    type: 'error',
                    content: 'Please upload your canvass.',
                    className: 'custom-class',
                    duration: 1.5,
                    style: {
                        marginTop: '20vh',
                    },
                });
             } else if (pitchUpload === "" && !pitch) {
                 send && console.log("loading: " + JSON.stringify(pitchFile));
                 setSend(false)
                 send &&  messageApi.open({
                    type: 'error',
                    content: 'Please upload your pitch.',
                    className: 'custom-class',
                    duration: 1.5,
                    style: {
                        marginTop: '20vh',
                    },
                });
             }else if (canvassUpload !== "" && !canvass && pitchUpload !== "" && !pitch) {
                     send && console.log(JSON.stringify(field));
                     setSend(false)
                     send && formData(field)
             }
             else {
                 send && console.log(JSON.stringify(field));
                 setSend(false)
                 send && formData(field)
             }
         }
     }, [send])
 

    // Lite Forms
    const liteForm = (value) => {
        liteForms(value)
    };

    const liteForms = (value) => {
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company,
            canvass: value.canvass,
            "canvass-upload": canvassUpload ? canvassUpload : '',
            stage: value.stage,
            plan: value.lite,
            expectations: value.expectations,
            reference: refId === undefined ? `${value.lite}${randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' })}` : refId,
            bill: 30,
            country: country,
            email: value.email
        }
        setSend(true)
        setField(fields)
    };

    // Basic Form
    const basicForm = (value) => {
        basicForms(value)

    };
    const basicForms = (value) => {
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company,
            canvass: value.canvass,
            "canvass-upload": canvassUpload ? canvassUpload : '',
            pitch: value.pitch,
            "pitch-upload": pitchUpload ? pitchUpload : '',
            stage: value.stage,
            plan: value.basic,
            expectations: value.expectations,
            reference: refId === undefined ? `${value.basic}${randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' })}` : refId,
            bill: 81,
            country: country,
            email: value.email
        }
        setSend(true)
        setField(fields)
    };

    // Pro forms
    const proForm = (value) => {
        proForms(value)

    };
    const proForms = (value) => {
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company,
            canvass: canvassUpload === '' ? "no" : value.canvass,
            "canvass-upload": canvassUpload ? canvassUpload : '',
            pitch: pitchUpload === '' ? "no" :  value.pitch,
            "pitch-upload": pitchUpload ? pitchUpload : '',
            stage: value.stage,
            plan: value.pro,
            expectations: value.expectations,
            others: value.others,
            reference: refId === undefined ? `${value.pro}${randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' })}` : refId,
            bill: 1500,
            country: country,
            email: value.email
        }
        setSend(true)
        setField(fields)
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
                    messageApi.open({
                        type: 'success',
                        content: 'Thank you, You will recieve an email with the payment instruction!.',
                        className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        },
                        duration: 1.5,
                    });
                    setPitchUpload("")
                    setCanvassUpload("")
                    onReset()
                    setLite(false)
                    setBasic(false)
                    setPro(false)
                    setRefId(undefined)
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
                            <span>81/Session</span>
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
        {contextHolder}
            {/* Lite Plan Modal */}
            <Modal
                destroyOnClose={true}
                title="Lite Plan"
                centered
                open={lite}
                onCancel={() => {
                    onReset()
                    setLite(false)
                }}
                width={"80%"}
                style={{ maxWidth: "800px" }}
                footer={null}
            >
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        initialValues={{ lite: 'lite', country: "Nigeria", canvass: "no" }}
                        name="lite"
                        onFinish={liteForm}
                        layout="vertical"
                        className='formGrid'
                    // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }} 
                    >

                        <Form.Item name="lite" style={{ display: 'none' }}>
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
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
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
                            label="Do you have Business Model Canvass"
                            rules={[
                                {
                                    required: true,
                                    message: "Do you have Business Model Canvass",
                                },
                            ]}>
                            <Radio.Group
                                className="radio_button"
                                onChange={(e: RadioChangeEvent) => {
                                    e.target.value === "yes" ? setCanvass(false) : setCanvass(true)
                                }}
                            >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no" >No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Upload Business Model Canvass"
                            name="canvassUpload"
                            rules={[
                                {
                                    required: !canvass,
                                    message: "Upload Business Model Canvass",
                                },
                            ]}>
                            <Upload
                            name="canvassUpload"
                            maxCount={1}
                            listType="picture"
                            beforeUpload={() =>{ return false}}
                            onChange={(e) => (
                                setCanvassFile(e.file),
                                refId === undefined && setRefId('lite' + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }))
                                )}
                            >
                                <Button disabled={canvass}>Upload Canvass</Button>
                            </Upload>
                        </Form.Item>
                       
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
                </Spin>
            </Modal>

            {/* Basic Plan Modal */}
            <Modal
                destroyOnClose={true}
                title="Basic Plan"
                centered
                open={basic}
                onCancel={() => {
                    onReset()
                    setBasic(false)
                }}

                width={"80%"}
                style={{ maxWidth: "800px" }}
                footer={null}
            >
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        initialValues={{ basic: 'basic', country: "Nigeria", canvass: "no", pitch: "no" }}
                        name="basic"
                        onFinish={basicForm}
                        layout="vertical"
                        className='formGrid'
                    // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                    >

                        <Form.Item name="basic" style={{ display: 'none' }} >
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
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
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
                            rules={[
                                {
                                    required: true,
                                    message: "Select your country of residence",
                                },
                            ]}>
                            <Select
                                // placeholder="Country of residence"
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
                        <Form.Item name="canvass"
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
                                onChange={(e: RadioChangeEvent) => {
                                    e.target.value === "yes" ? setCanvass(false) : setCanvass(true)
                                }}
                            >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no" >No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Upload Business Model Canvass"
                            name="basicCanvass"
                            rules={[
                                {
                                    required: !canvass,
                                    message: "Upload Business Model Canvass",
                                },
                            ]}>
                            <Upload 
                                name="basicCanvass"
                                maxCount={1}
                                listType="picture"
                              beforeUpload={() => false}
                              onChange={(e) => (setCanvassFile(e.file),
                                refId === undefined && setRefId('basic' + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }))
                                )}
                            >
                                <Button disabled={canvass}>Upload Canvass</Button>
                            </Upload>
                        </Form.Item>


                        <Form.Item name="pitch"
                            label="Do you have a pitch deck?"
                            rules={[
                                {
                                    required: true,
                                    message: "Do you have a pitch deck?",
                                },
                            ]}>
                            <Radio.Group
                                className="radio_button"
                                onChange={(e: RadioChangeEvent) => {
                                    e.target.value === "yes" ? setPitch(false) : setPitch(true)
                                }}
                            >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no" >No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Upload pitch deck"
                                name="basicPitch"
                            rules={[
                                {
                                    required: !pitch,
                                    message: "Upload pitch deck",
                                },
                            ]}>
                            <Upload name="pitchUpload"
                                onChange={(e) => (setPitchFile(e.file),
                                refId === undefined && setRefId('basic' + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }))
                                )}
                                maxCount={1}
                                listType="picture"
                              beforeUpload={() => false}
                              rules={[{required: true, message:  "Upload pitch deck"}]}
                            // className="avatar-uploader"
                            >
                                <Button disabled={pitch}> Upload pitch deck</Button>
                            </Upload>
                        </Form.Item>

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
                                    setBasic(false)
                                    //             setPitchUpload("")
                                    // setCanvassUpload("")
                                }}
                            >
                                Close
                            </Button>
                        </Form.Item >

                    </Form>
                </Spin>
            </Modal>

            {/* Pro Plan Modal */}
            <Modal
                destroyOnClose={true}
                title="Pro Plan"
                centered
                open={pro}
                onCancel={() => {
                    onReset()
                    setPro(false)
                }}

                width={"80%"}
                style={{ maxWidth: "800px" }}
                footer={null}
            >
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        initialValues={{ pro: 'pro', country: "Nigeria", canvass: "no", pitch: "no" }}
                        name="pro"
                        onFinish={proForm}
                        layout="vertical"
                        className='formGrid'
                    // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '24px' }}
                    >

                        <Form.Item name="pro" style={{ display: 'none' }} >
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
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
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

                        <Form.Item name="canvass"
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
                                onChange={(e: RadioChangeEvent) => {
                                    e.target.value === "yes" ? setCanvass(false) : setCanvass(true)
                                }}
                            >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no" >No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Upload Business Model Canvass"
                            name="proCanvass"
                            rules={[
                                {
                                    required: !canvass,
                                    message: "Upload Business Model Canvass",
                                },
                            ]}>
                            <Upload name="proCanvass"
                                onChange={(e) => (setCanvassFile(e.file),
                                refId === undefined && setRefId('pro' + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }))
                                )}
                                maxCount={1}
                                listType="picture"
                              beforeUpload={() => false}
                            // className="avatar-uploader"
                            >
                                <Button disabled={canvass}>Upload Canvass</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item name="pitch"
                            label="Do you have a pitch deck?"
                            rules={[
                                {
                                    required: true,
                                    message: "Do you have a pitch deck?",
                                },
                            ]}>
                            <Radio.Group
                                className="radio_button"
                                onChange={(e: RadioChangeEvent) => {
                                    e.target.value === "yes" ? setPitch(false) : setPitch(true)
                                }}
                            >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no" >No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Upload pitch deck"
                            name="proPitch"
                            rules={[
                                {
                                    required: !pitch,
                                    message: "Upload pitch deck",
                                },
                            ]}>
                            <Upload name="proPitch"
                                onChange={(e) => (setPitchFile(e.file),
                                refId === undefined && setRefId('pro' + randomstring.generate({ length: 12, charset: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' }))
                                )}
                                maxCount={1}
                                listType="picture"
                              beforeUpload={() => false}
                            // className="avatar-uploader"
                            >
                                <Button disabled={pitch}> Upload pitch deck</Button>
                            </Upload>
                        </Form.Item>

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
                </Spin>
            </Modal>


        </section>
    )
}

export default Pricing