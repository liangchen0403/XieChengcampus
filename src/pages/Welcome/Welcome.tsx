import React, { useRef, useEffect } from 'react'
import './Welcome.css'
import { Carousel , Button} from 'antd';
// Import the Carousel type for ref usage
import type { CarouselRef } from 'antd/es/carousel';
import Login from '../Login'
import homePage from '../../common/image/homePage.png'


const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '100vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: `url(${homePage}) center/cover no-repeat`,
};
export default function Welcome() {
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        // Scroll down, go to next slide
        carouselRef.current?.next();
      } else {
        // Scroll up, go to previous slide
        carouselRef.current?.prev();
      }
    };

    // Add wheel event listener to the document
    document.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <Carousel ref={carouselRef} arrows dotPlacement="start" infinite={false}>
        <div>
          <div style={contentStyle}>
            <div className="systemTitle" >易宿酒店管理系统</div>
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