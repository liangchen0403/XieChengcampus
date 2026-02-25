import React, { useRef, useEffect } from 'react'
import './Welcome.css'
import { Carousel } from 'antd';
// Import the Carousel type for ref usage
import type { CarouselRef } from 'antd/es/carousel';
import Login from '../Login'
import WelcomeImage from '../../common/image/welcome0.png'
import WelcomeImage1 from '../../common/image/login.png'

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '100vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
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
          <div style={
            {
              margin: 0,
              height: '100vh',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: `url(${WelcomeImage}) center/cover no-repeat`,
            }
          }>
            <div className="systemTitle" ></div>
          </div>
        </div>
        <div>
          <div style={
            {
              margin: 0,
              height: '100vh',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: `url(${WelcomeImage1}) center/cover no-repeat`,
            }
          }>
            <div >
              <Login/>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  )
}