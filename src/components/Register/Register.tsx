import React, { useState } from 'react';
import type { FormItemProps, FormProps } from 'antd'
import { 
  AutoComplete, 
  Checkbox,
  Button, 
  Drawer, 
  Form, 
  Input, 
  InputNumber,
  Select, 
  Space 
} from 'antd';
import type { DefaultOptionType } from 'antd/es/select';

const formItemLayout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout: FormItemProps = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

//抽屉展开组件
const App: React.FC = () => {
  const [open, setOpen] = useState(false);
//展开回调函数
  const showDrawer = () => {
    setOpen(true);
  };
//关闭回调函数
  const onClose = () => {
    setOpen(false);
  };

//注册组件
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    setAutoCompleteResult(
      value ? ['.com', '.org', '.net'].map((domain) => `${value}${domain}`) : [],
    );
  };

  const websiteOptions = autoCompleteResult.map<DefaultOptionType>((website) => ({
    label: website,
    value: website,
  }));

  return (
    <>
      <Button color="primary" variant="text" onClick={showDrawer}>
            去注册
          </Button>
      <Drawer
        title="Register"
        size={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { type: 'tel', message: 'The input is not valid phone number!' },
            ]}
          >
            {/* Demo only, real usage should wrap as custom component */}
            <Space.Compact block>
              <Input style={{ width: '100%' }} />
            </Space.Compact>
          </Form.Item>



          <Form.Item
            name="gender"
            label="身份"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select
              placeholder="select your gender"
              options={[
                { label: 'Admin', value: 'admin' },
                { label: 'Merchant', value: 'merchant' },
                { label: 'Other', value: 'other' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;