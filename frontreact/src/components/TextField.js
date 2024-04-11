import React from 'react'

const Textfield = ({onChangeValue, type = 'text', value, label, formatter}) => {
  return (
    <div className='flex flex-col'>
      <label className='font-semibold' htmlFor="" >{label}</label>
      <input className='border-2 rounded-lg px-6 py-4 mt-4' type={type} value={value} onChange={onChangeValue} />
    </div>
  )
}

export default Textfield