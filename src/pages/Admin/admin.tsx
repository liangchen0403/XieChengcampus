import React from 'react';
import { Flex, Layout, Menu } from 'antd';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { UserOutlined, HomeOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 84,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
//   backgroundColor: '#0958d9',
};

const siderStyle: React.CSSProperties = {
  backgroundColor: '#1677ff',
};

const menuStyle: React.CSSProperties = {
  height: '100%',
  borderRight: 0,
  color: '#fff',
};


const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
};

const App: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 导航菜单配置
  const menuItems = [
    {
      key: '/admin/showHotel',
      icon: <UserOutlined />,
      label: <Link to="/admin/showHotel">酒店总览</Link>,
    },
    {
      key: '/admin/pendHotel',
      icon: <SettingOutlined />,
      label: <Link to="/admin/pendHotel">审核酒店</Link>,
    },
    {
      key: '/admin/publishHotel',
      icon: <SettingOutlined />,
      label: <Link to="/admin/publishHotel">发布/下线酒店</Link>,
    },
    {
      key: '/login',
      icon: <LogoutOutlined />,
      label: <Link to="/Welcome">退出登录</Link>,
    },
  ];

  return (
    <div style={{width:'100vw', height:'100vh', padding: 0, margin: 0, overflow: 'hidden'}}>
      <Flex gap="middle" style={{width: '100%', height: '100%'}}>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <div style={{fontSize:'42px', letterSpacing: '20px',paddingTop:'10px'}}>易宿酒店管理系统</div>
          </Header>
          <Layout style={{flex: 1}}>
            <Sider width="20%" style={siderStyle}>
              <Menu
                style={menuStyle}
                mode="inline"
                selectedKeys={[currentPath]}
                items={menuItems}
              />
            </Sider>
            <Content style={{...contentStyle, minHeight: 'calc(100vh - 64px)', padding: 24}}>
              {/* 路由出口，用于展示子路由内容 */}
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Flex>
    </div>
  );
};
export default App;