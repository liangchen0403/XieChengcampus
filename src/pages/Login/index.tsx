import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import Register from '../../components/Register';
import { login } from '../../services/authService';
import type { LoginRequest } from '../../types/auth';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //登录提交函数
  const onFinish = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await login(values);
      if (response.code === 200) {
        // 存储token到localStorage
        localStorage.setItem('token', response.data?.token || '');
        localStorage.setItem('user', JSON.stringify(response.data?.user));
        localStorage.setItem('token_expiry', (Date.now() + (response.data?.expiresIn || 0) * 1000).toString());
        
        message.success('登录成功');
        // 根据用户角色跳转到不同页面
        if (response.data?.user.role === 'admin') {
          navigate('/admin/showHotel');
        } else if (response.data?.user.role === 'merchant') {
          navigate('/merchant/MerchantHome');
        } else if (response.data?.user.role === 'user') {
          <Alert
            title="Warning"
            description="本系统不用于用户登录，仅管理员和商户登录"
            type="warning"
            showIcon
            closable
          />
        } else {
          <Alert
            title="Error"
            description="登录失败，请联系管理员"
            type="error"
            showIcon
          />
          navigate('/login');
        }
      } else {
        message.error(response.message || '登录失败');
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error('登录失败，请检查网络或账号密码');
    } finally {
      setLoading(false);
    }
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
          <Button block type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
          or <Register/>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;