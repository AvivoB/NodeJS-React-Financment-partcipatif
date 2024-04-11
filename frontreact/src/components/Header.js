import React from 'react'
import { getImage } from '../utils/someFunctions'
import { Link } from 'react-router-dom'
import Button from './Button'

const Header = () => {
  return (
    <div className='px-12 mobile:px-3'>
      <div className='bg-white py-4'>
        <div className="grid grid-cols-2 font-semibold">
          <div className='grid grid-cols-3 mobile:grid-cols-1 items-center'>
            <div><Link to={'/'}><img className='w-1/3' src={getImage('Logo.png')} alt="" /></Link></div>
            <div className='mobile:hidden'><Link>Découvrir les projets</Link></div>
            <div className='mobile:hidden'><Link>Créez mon projet</Link></div>
          </div>
          <div className='grid grid-cols-3 mobile:grid-cols-1 items-center'>
            <div className='flex justify-end mobile:hidden'><Link><input type="text" placeholder='Rechercher...' className='border rounded-xl  border-slate-500 px-4 py-1' /></Link></div>
            <div className='flex justify-end mobile:hidden'><Link>Se connecter</Link></div>
            <div className='flex justify-end'><Link to={'/creer-mon-compte'}><Button text={'Créez mon projet'} /></Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header