import React from 'react'
interface ButtonProps {
    children: React.ReactNode;
    className?:React.ReactNode
    Onheandel?:() => {}
  }
const Button:React.FC<ButtonProps> = ({children,className,Onheandel}) => {
  return (
    <div>
      <button className={`py-4 md:px-8 px-6 rounded-full bg-[#130726] md:text-[20px] text-sm font-semibold ${className}`} onClick={Onheandel} >
             {children}
            </button>
    </div>
  )
}

export default Button

