import React, { useState } from 'react'
import '../App.css'
import { Button, Form, Input, InputNumber, Select, Modal, DatePicker, message, notification, Spin } from 'antd'
import axios from 'axios'
import moment from 'moment'
import useMessage from 'antd/es/message/useMessage'

function Bootcamp() {
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input;
  const [messageApi, contextHolder] = useMessage();
    


    const [loading, setLoading] = useState(false)
    const [hire, setHire] = useState(false)
    const [online, setOnline] = useState(false)
    const [physical, setPhysical] = useState(false)
    const [chooseDate, setChooseDate] = useState(true)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    const onReset = () => {
        form.resetFields();
    };
    const startDay = (current) => {
        // Can not select days before today and today
        setChooseDate(false)
        return current && current < moment();
      };

      const endDay = (current) => {
        // Can not select days before today and today
        return current && current < moment(startDate);
      };


    const hireForm = (value) => {
        let fields = {
            firstname: value.firstname,
            lastname: value.lastname,
            company: value.company ? value.company : "",
            email: value.email,
            "event-type": value.event_type,
            audience: value.audience,
            mode: value.mode,
            address: value.address ? value.address : "",
            link: value.link ? value.link : "",
            "start-date":startDate,
            "end-date": endDate,
            expectations: value.expectations ? value.expectations : "",
            others: value.others ? value.others : "",
           
        }
        formData(fields)
        console.log(fields)
    };

    const eventMode = (e) => {
        console.log(e)
        {e === "physical" && setPhysical(true); setOnline(false)}
        {e === "online" && setOnline(true); setPhysical(false)}
        {e === "hybrid"  && setOnline(true); setPhysical(true)}
    }

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
                    messageApi.open({
                        type: 'success',
                        content: 'Thank you, I will get back to you shortly.',
                        className: 'custom-class',
                        style: {
                          marginTop: '20vh',
                        },
                      });
                    setHire(false)
                    console.log(fields)
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
    {contextHolder}

     {/* Hire me modal */}
     <Modal
      destroyOnClose={true}
                title="Hire me"
                centered
                open={hire}
                onCancel={() => {
                    onReset()
                    setHire(false)
                }}
                width={"80%"}
                style={{ maxWidth: "800px"}}
                footer={null}
            >
                <Spin spinning={loading}>
                <Form
                    form={form}
                    initialValues={{ audience: 10 }}
                    name="hire"
                    onFinish={hireForm}
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

                    <Form.Item name="company" label="Company Name">
                        <Input
                            placeholder='Enter company Name'
                            className="inputWidthFull"
                        />
                    </Form.Item>


                    <Form.Item name="event_type" label="Event Type"
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

                    <Form.Item name="audience" label="Number of participants"
                    initialValue={10}>
                        <InputNumber min={1} max={99999} initialValue={10} />
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
                        <DatePicker
                        disabledDate={startDay}
                         onChange={e => setStartDate(moment(e.$d).format(
                            "MMM D, YYYY"
                        ))
                        } />
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
                        <DatePicker 
                        disabledDate={endDay}
                        disabled={chooseDate}
                        onChange={e => setEndDate(moment(e.$d).format(
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
                            onChange={eventMode}
                        >
                            <Option value="hybrid">Hybrid</Option>
                            <Option value="physical">Physical</Option>
                            <Option value="online">Online</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="address" label="Enter address" 
                           rules={[
                            {
                                required: physical,
                                message: "Please enter last name",
                            },
                        ]}
                    style={{ gridColumn: '1/2' }}>
                        <Input
                            placeholder='Address'
                            className="inputWidthFull"
                        />
                    </Form.Item>

                    <Form.Item name="link" label="Event Url" 
                           rules={[
                            {
                                type: 'url',
                                message: "Please enter a correct url",
                            },
                        ]}
                    style={{ gridColumn: '2/3' }}>
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
                            Submit
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
                </Spin>
            </Modal>

</section>
  )
}

export default Bootcamp