import React from 'react'
import { MoonLoader } from "react-spinners";


function LoadingScreen() {
  return (
    <div className='min-w-screen min-h-screen max-w-screen max-h-screen flex items-center justify-center'>
      <MoonLoader color='black' size={34}/>
    </div>
  )
}

export default LoadingScreen
