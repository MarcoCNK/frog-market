import React, { useContext, useState } from 'react'
import fogPicture from '/public/bogCartoon.webp'
import { AuthContext } from '../Context/AuthContenxt'


const Layout = () => {
  const { isLoged } = useContext(AuthContext)
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate((prevState) => !prevState);
  };

  return (

    <div className="relative w-full h-[500px]">
      <img
        src={fogPicture}
        alt="Foggy market"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
        <svg width="0" height="0" >
          <filter id="water-effect" >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.02"
              numOctaves="3"
              result="noise" >
              <animate

                attributeName="baseFrequency"
                values="0.01 0.02; 0.02 0.03; 0.01 0.02"
                dur={animate ? "4s" : "0s"}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G" />
          </filter>
        </svg>
        <h1 className="text-4xl font-bold hover:pointer" onClick={handleClick} style={{ filter: 'url(#water-effect)', cursor: 'pointer' }}  > Welcome to Froggy Market</h1>

        <svg width="0" height="0" >
          <filter id="shake-effect" >
            <feTurbulence type="fractalNoise" baseFrequency="0" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
              <animate  attributeName="scale" values="0; 10; 0" dur="0.5s" repeatCount="1" />
            </feDisplacementMap>
          </filter>
        </svg>
        {
          isLoged
            ? <p className="text-lg mt-2" style={{ filter: 'url(#shake-effect)' }} >We have all kinds of bogs, frogs and bugs</p>
            : <p className="text-lg mt-2 text-red-500">Please login to see our products</p>
        }

      </div>
    </div>


  )
}

export default Layout