import React from 'react'

export default function InputBox({label,placeholder,onChange}) {
  return (
    <div >
      <div className=' text-sm font-medium text-left py-2'>{label}</div>
      <input onChange={onChange} placeholder={placeholder} className='w-full py-1 px-2 border border-slate-200 rounded'/>
    </div>
  )
}
