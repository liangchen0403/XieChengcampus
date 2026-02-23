// ...existing code...
import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '111111111',
    key: '/merchant/test',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Three - Submenu',
    key: '/merchant/submenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { label: 'Option 1', key: '/merchant/test2' },
          { label: 'Option 2', key: '/merchant/setting2' },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { label: 'Option 3', key: '/merchant/setting3' },
          { label: 'Option 4', key: '/merchant/setting4' },
        ],
      },
    ],
  },
  {
    key: '/alipay',
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Menu 
                onClick={onClick} 
                selectedKeys={[current]} 
                mode="horizontal" 
                items={items}
                style={{ width: '100%',marginTop:'20px' }}
            />
            <div style={{ flex: 1 }}>
                <Outlet></Outlet>
            </div>
        </div>
    </>
  );
};

export default App;
