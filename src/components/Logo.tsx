import React from 'react'
import logoimg from "../../public/codelogo.png" 

const  Logo:React.FC = () => {
  return (
    <div>
      <img src ={logoimg} alt="" className=' w-16 ' />
    </div>
  )
}

export default Logo
