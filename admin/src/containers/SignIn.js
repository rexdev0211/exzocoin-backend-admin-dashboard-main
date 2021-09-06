import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {userSignIn} from "../appRedux/actions";
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";


const SignIn = (props) => {
  const dispatch = useDispatch();
  const authUser = useSelector(({auth}) => auth.authUser);

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    console.log("finish",values)
    dispatch(userSignIn(values));
  };

  useEffect(() => {
    if (authUser !== null) {
      props.history.push('/');
    }
  }, [authUser]);

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg" style={{textAlign: "center"}}>
              <img src="/assets/images/Exzo_logo.png" alt='Neature' style={{width: "235px", height: "235px"}}/>
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn"/></h1>
              <p><IntlMessages id="app.userAuth.bySigning"/></p>
              <p><IntlMessages id="app.userAuth.getAccount"/></p>
            </div>
            {/* <div className="gx-app-logo">
              <img alt="example" src="/assets/images/logo.png"/>
            </div> */}
          </div>
          <div className="gx-app-login-content" style={{backgroundImage: 'url("http://exzocoin.com/wp-content/uploads/2021/05/exzo-new-header.jpg")', backgroundSize: "cover"}}>
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                initialValue="admin"
                rules={[{ required: true, message: 'The input is not valid E-mail!' }]} name="email">
                <Input placeholder="Email"/>
              </Form.Item>
              <Form.Item
                rules= {[{required: true, message: 'Please input your Password!'}]}  name="password">
                <Input type="password" placeholder="Password"/>
              </Form.Item>
              {/* <Form.Item>
                <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </Form.Item> */}
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn"/>
                </Button>
                {/* <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                id="app.userAuth.signUp"/></Link> */}
              </Form.Item>
            </Form>
          </div>
          <InfoView/>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
