import React from 'react'
import { calculateDaysLeft, calculateDaysPast, getImage } from '../utils/someFunctions'

const CardProject = ({projet}) => {
  return (
    <div className='bg-white rounded-lg shado-lg gap-4 m-4'>
        <img className='w-full h-[200px]' src={projet.IMAGEURL} alt="" />
        <div className='bg-white p-4 h-[220px]'>
            {
                projet.ETAT == 'Terminée' && 
                <div className='bg-green-500 text-white px-2 py-1 rounded-lg w-1/3 text-center'>{projet.ETAT}</div>
            }
            <p className='font-semibold text-xl py-4'>{projet.NOM}</p>
            <div className="grid grid-cols-2">
                <p className=''>par <span className='font-semibold'>{projet.PSEUDO}</span></p>
                <p className='text-right'>8 Participants</p>
            </div>
            {
                projet.ETAT == 'En cours' && 
                <>
                    <div className='grid grid-cols-2 py-4'>
                        <div>
                            <p className='font-semibold'>{calculateDaysLeft(projet.DATEFIN)} jours restant</p>
                            <p>Depuis {calculateDaysPast(projet.DATEDEBUT)} jours</p>
                        </div>
                        <div className='text-right'>
                            <p className='font-semibold'> {projet.AMOUNT} € récolté</p>
                            <p>Sur {projet.OBJECTIF} €</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="h-3 bg-slate-100 rounded-lg w-5/6">
                            <div style={{width: `${(projet.AMOUNT / projet.OBJECTIF * 100) }%`}} className='h-3 bg-blue-500 rounded-lg'></div>
                        </div>
                        <div>
                            {(projet.AMOUNT / projet.OBJECTIF * 100).toFixed(0)} %
                        </div>
                    </div>
                </>
            }

        </div>
    </div>
  )
}

export default CardProject