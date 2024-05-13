import React, { useEffect, useState } from 'react'
interface CursorPosition {
    x: number;
    y: number;
    
  }
  
const  Cursor: React.FC = () =>  {
    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
 
    
    
    useEffect(() => {
      const handleMouseMove = (event:any) => {
        setPosition({ x: event.clientX, y: event.clientY });
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        // Cleanup: Remove the event listener when the component unmounts
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []); 
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: position.y - 5.5, // Adjust the offset as needed
          left: position.x - 5.5, // Adjust the offset as needed
          width: '20px',
          height: '20px',
          background: 'transprant', // You can customize the styling
          borderRadius: '50%',
          zIndex: 100,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          // transition: 'transform 0.3s ease-out', // CSS transition for smooth scaling
          // Scale the cursor on hover
        }}
      />
    </>
  )
}

export default Cursor

