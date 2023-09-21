import React, { useEffect } from 'react'

const Alert = ({alert,popAlert}) => {
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      popAlert()
    },3000)
    return ()=>clearTimeout(timeout)
  })
  const{type,message}=alert;
  return (
    <div className={`alert alert-${type}`}>
      <p id='alert'>{message}</p>
      
      </div>
  )
}

export default Alert