import { Card, Button, Col, Form, message, Row, Select, Input } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SendOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, CopyOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { getUserById } from 'appRedux/actions'
import IntlMessages from 'util/IntlMessages'

const FormItem = Form.Item
const Option = Select.Option

const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.oneUser);

  const { userid } = useParams()
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(getUserById(userid));
  }, [userid])

  useEffect(() => {
    if (!user) return
    form.setFieldsValue({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      type: user.type,
      seedPhrase: user.seedPhrase,
      website: user.website,
      telegram: user.telegram,
      facebook: user.facebook,
      twitter: user.twitter,
      instagram: user.instagram,
      linkedin: user.linkedin,
      whitepaper: user.whitepaper,
    })
  }, [user])

  const onSave = (e) => {
    e.preventDefault()
    form.validateFields().then(values => {
      console.log(values)
      message.success("User updated")
    });    
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 8 },
      sm: { span: 16 },
    },
  }

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  return (
    <>
      <h2 className="title gx-mb-4"><Link to="/users"><IntlMessages id="sidebar.swapUsers" /></Link> -&gt; Edit user</h2>

      <Card>
        <Form onSubmit={onSave} form={form} className="gx-px-5">
          <Row>
            <Col md={12}>
              <FormItem {...formItemLayout} name="username" labelAlign="right" label="Username:">
                  <Input
                    type="text"
                    readOnly
                    placeholder="Username"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="firstName" labelAlign="right" label="Firstname:">
                  <Input
                    type="text"
                    placeholder="Firstname"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="lastName" labelAlign="right" label="Lastname:">
                  <Input
                    type="text"
                    placeholder="Lastname"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="email" labelAlign="right" label="Email:">
                <Input
                    type="email"
                    placeholder="Email"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="phoneNumber" labelAlign="right" label="Phone:">
                <Input
                    type="number"
                    placeholder="Phone"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="type" labelAlign="right" label="Type:">
                <Select>
                  <Option value="admin" disabled>
                    Admin
                  </Option>
                  <Option value="user" disabled>User</Option>
                  <Option value="creator" disabled>Creator</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormItem {...tailLayout}>
                <Button
                  className="gx-ml-5"
                  type="primary"
                  onClick={onSave}
                >
                  Save
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}

export default EditUser;
