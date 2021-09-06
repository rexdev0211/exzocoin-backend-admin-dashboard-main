import { Button, Col, Form, Modal, Row, Select, Input } from 'antd'
import { SendOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, CopyOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import IntlMessages from 'util/IntlMessages'

const FormItem = Form.Item
const Option = Select.Option

const UserModal = (props) => {
  const [visible, setVisible] = useState(false)
  const { onClose, open, user } = props
  const [form] = Form.useForm()

  useEffect(() => {
    setVisible(open)
  }, [open])

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
  const handleOk = () => {
    setVisible(false)
    onClose()
  }

  const handleCancel = () => {
    setVisible(false)
    onClose()
  }

  const onSave = (e) => {
    e.preventDefault()
    form.validateFields().then(values => {
      console.log(values)
    });    
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  }

  return (
    <Modal
      title="Edit user"
      visible={visible}
      centered
      width={500}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="save" onClick={onSave}>
          Save
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
      ]}
    >
      <Form onSubmit={onSave} form={form}>
        <Row>
          <Col md={24}>
            <FormItem {...formItemLayout} name="username" labelAlign="left" label="Username:">
                <Input
                  type="text"
                  readOnly
                  placeholder="Username"
                />
            </FormItem>
          </Col>
          <Col md={12}>
            <FormItem {...formItemLayout} name="firstName" labelAlign="left" label="Firstname:">
                <Input
                  type="text"
                  placeholder="Firstname"
                />
            </FormItem>
          </Col>
          <Col md={12}>
            <FormItem {...formItemLayout} name="lastName" labelAlign="left" label="Lastname:">
                <Input
                  type="text"
                  placeholder="Lastname"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="email" labelAlign="left" label="Email:">
              <Input
                  type="email"
                  placeholder="Email"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="phoneNumber" labelAlign="left" label="Phone:">
              <Input
                  type="number"
                  placeholder="Phone"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="type" labelAlign="left" label="Type:">
              <Select>
                <Option value="admin" disabled>
                  Admin
                </Option>
                <Option value="user" disabled>User</Option>
                <Option value="creator" disabled>Creator</Option>
              </Select>
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="seedPhrase" labelAlign="left" label="SeedPhrase:">
                <Input
                  type="text"
                  placeholder="SeedPhrase"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="website" labelAlign="left" label="Website:">
                <Input
                  type="text"
                  placeholder="Website"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="telegram" labelAlign="left" label="Telegram:">
                <Input
                  type="text"
                  prefix={<SendOutlined />}
                  placeholder="Telegram"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="facebook" labelAlign="left" label="Facebook:">
                <Input
                  type="text"
                  prefix={<FacebookOutlined />}
                  placeholder="Facebook"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="twitter" labelAlign="left" label="Twitter:">
                <Input
                  type="text"
                  prefix={<TwitterOutlined />}
                  placeholder="Twitter"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="instagram" labelAlign="left" label="Instagram:">
                <Input
                  type="text"
                  prefix={<InstagramOutlined />}
                  placeholder="Instagram"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="linkedin" labelAlign="left" label="LinkedIn:">
                <Input
                  type="text"
                  prefix={<LinkedinOutlined />}
                  placeholder="LinkedIn"
                />
            </FormItem>
          </Col>
          <Col md={24}>
            <FormItem {...formItemLayout} name="whitepaper" labelAlign="left" label="Whitepaper:">
                <Input
                  type="text"
                  prefix={<CopyOutlined />}
                  placeholder="Whitepaper"
                />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UserModal;
