import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Select } from 'antd';
import Register from '../../components/Register';

const App: React.FC = () => {
  //登录提交函数
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    //登录表单
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ width: '100%', maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <Register/>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;

