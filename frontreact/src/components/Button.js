import React from 'react'

const Button = ({text}) => {
  return (
    <div>
        <button className='bg-blue-500 text-white px-6 py-3 rounded-lg'>{text}</button>
    </div>
  )
}

export default Button