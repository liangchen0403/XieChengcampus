import React from 'react'
import './Welcome.css'
import { Carousel , Button} from 'antd';
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '100vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export default function Welcome() {
  return (
    <>
      <Carousel arrows dotPlacement="start" infinite={false}>
        <div>
          <div style={contentStyle}>
            <div className="systemTitle">易宿酒店管理系统</div>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <div>系统详情</div>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <div >
              <Login/>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  )
}
