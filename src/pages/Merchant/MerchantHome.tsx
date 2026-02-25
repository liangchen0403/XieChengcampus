import React from 'react'
import homePage from '../../common/image/welcome.png'

export default function MerchantHome() {
  return (
    <div style={{
      width: '100vw',
      height: '90vh',
      backgroundImage: `url(${homePage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    }}>
    </div>
  )
}