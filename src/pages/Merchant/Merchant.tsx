// ...existing code...
import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: (
            <img
                src="https://ts3.tc.mm.bing.net/th/id/OIP-C.2d5X7HBz2EsEQIIxmwf92AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Logo"
                style={{ height: 60, verticalAlign: 'middle' }}
            />
        ),
        key: '#',
        disabled: true,
        style: { cursor: 'default', background: 'transparent' },
    },
    {
        label: '首页',
        key: '/merchant/MerchantHome',
        icon: <MailOutlined />,
    },
    {
        label: '酒店管理',
        key: '/merchant/HotelManage',
        icon: <SettingOutlined />,
    },
    {
        label: '房型管理',
        key: '/merchant/RoomManage',
        icon: <SettingOutlined />,
    },
    {
        label: '消息通知',
        key: '/merchant/Notice',
        icon: <SettingOutlined />,
    },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState<string>(location.pathname || 'test');

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    const path = String(e.key);
    // 外部链接保持原样（以 http 开头）
    if (/^https?:\/\//.test(path)) return;
    navigate(path);
    setCurrent(path);
  };

  return (
    <>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width:'100vw' }}>
            <Menu 
                onClick={onClick} 
                selectedKeys={[current]} 
                mode="horizontal" 
                items={items}
                style={{ width: '100%', height:'60px', fontSize:'20px', paddingTop:'5px', marginBottom:'10px' }}
            />
            <div style={{ flex: 1 }}>
                <Outlet></Outlet>
            </div>
        </div>
    </>
  );
};

export default App;
