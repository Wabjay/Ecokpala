import React, { useState } from 'react'
import '../App.css'
import { Button, Form, Input, InputNumber, Select, Modal, DatePicker, message, notification } from 'antd'
import {  } from 'devextreme-react'
import axios from 'axios'
import moment from 'moment'

function Bootcamp() {
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false)
    const [hire, setHire] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    const onReset = () => {
        form.resetFields();
    };


    const hireForm = (value) => {
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
            others: value.others,
           
        }
        formData(fields)
        console.log(fields)
    };

    const formData = async (fields) => {
        try {
            setLoading(true);

            const headers_ = {
                'Authorization': 'Bearer patd5XJefFAMxWXmb.3da22d3f260403f441b8e39442f1accd4d18adfc2ada549ca7e31ebcb8df915d',
                'Content-Type': 'application/json'
            };
            axios.post('https://api.airtable.com/v0/appHpGFLRdNMBkaIA/hire',
                {
                    // POST the data
                    fields

                }, { headers: headers_ }
            )
                .then((resp) => {
                    console.log("success!")
                    setLoading(false);
                    onReset()
                    notification.success({
                        message: "Form submitted",
                        description: "Thank you, I will get back to you shortly.",
                      })
                    setHire(false)
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
    <section className="section-sm bg-primary">
    <div className="container text-center text-sm-left">
        <div className="row align-items-center">
            <div className="col-sm offset-md-1 mb-4 mb-md-0">
                <h6 className="title text-light">Looking for a Facilitator for Bootcamps, Masterclasses, Trainings and
                    Workshops?</h6>
                <p className="m-0 text-light">Always feel free to hire me</p>
            </div>
            <div className="col-sm offset-sm-2 offset-md-3">
                <button className="btn btn-lg my-font btn-light rounded" onClick={() => setHire(true)}>Hire Me</button>
            </div>
        </div>
    </div>

     {/* Hire me modal */}
     <Modal
                title="Pro Plan"
                centered
                open={hire}
                onCancel={() => {
                    onReset()
                    setHire(false)
                }}
                width={"800px"}
                footer={null}
            >
                <Form
                    form={form}
                    // initialValues={{ plan: 'pro' }}
                    name="pro"
                    onFinish={hireForm}
                    // onFinish={formData}
                    layout="vertical"
                    className='formGrid'
                >


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
                                setHire(false)
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

export default Bootcamp