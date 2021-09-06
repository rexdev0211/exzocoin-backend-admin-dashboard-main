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
      <h2 className="title gx-mb-4"><Link to="/creators"><IntlMessages id="sidebar.tokenCreators" /></Link> -&gt; Edit creator</h2>

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
            <Col md={12}>
              <FormItem {...formItemLayout} name="seedPhrase" labelAlign="right" label="SeedPhrase:">
                  <Input
                    type="text"
                    placeholder="SeedPhrase"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="website" labelAlign="right" label="Website:">
                  <Input
                    type="text"
                    placeholder="Website"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="telegram" labelAlign="right" label="Telegram:">
                  <Input
                    type="text"
                    prefix={<SendOutlined />}
                    placeholder="Telegram"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="facebook" labelAlign="right" label="Facebook:">
                  <Input
                    type="text"
                    prefix={<FacebookOutlined />}
                    placeholder="Facebook"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="twitter" labelAlign="right" label="Twitter:">
                  <Input
                    type="text"
                    prefix={<TwitterOutlined />}
                    placeholder="Twitter"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="instagram" labelAlign="right" label="Instagram:">
                  <Input
                    type="text"
                    prefix={<InstagramOutlined />}
                    placeholder="Instagram"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="linkedin" labelAlign="right" label="LinkedIn:">
                  <Input
                    type="text"
                    prefix={<LinkedinOutlined />}
                    placeholder="LinkedIn"
                  />
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem {...formItemLayout} name="whitepaper" labelAlign="right" label="Whitepaper:">
                  <Input
                    type="text"
                    prefix={<CopyOutlined />}
                    placeholder="Whitepaper"
                  />
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
