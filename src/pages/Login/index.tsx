import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Alert, Checkbox } from 'antd';
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#1890ff',
          fontSize: '24px',
          fontWeight: '600'
        }}>欢迎登录</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#1890ff' }} />} 
              placeholder="用户名" 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input 
              prefix={<LockOutlined style={{ color: '#1890ff' }} />} 
              type="password" 
              placeholder="密码" 
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          </Form.Item>
          <Form.Item>
            <Button 
              block 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', marginTop: '16px' }}>
            还没有账号? <Register />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default App;