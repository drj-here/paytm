import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonWarning({label,buttonText,to}) {
  return (
    <div className='py-2 text-sm flex'>
      <div>{label}</div>
      <Link className='cursor-pointer pointer underline pl-1' to={to}>
      {buttonText}
      </Link>
    </div>
  )
}
