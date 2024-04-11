import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import { apiGet, getImage } from '../utils/someFunctions'
import { useProjects } from '../hooks/useProjects'
import CardProject from '../components/CardProject';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {


  const { projects } = useProjects();
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div>
        <Header />
        <div className='px-24 bg-slate-100 h-[550px] grid-cols-2 grid mobile:grid-cols-1 mobile:px-6'>
          <div className=' flex flex-col justify-center'>
            <h1 className='text-4xl font-semibold'>Libérez votre créativité et lancez vos projets grâce au crowdfunding</h1>
            <p className='py-6 text-2xl'>Nous avons déjà aidé 28 860 projets culturels et entrepreneuriaux à voir le jour. Et si c’était votre tour ?</p>
            <div className='py-12'>
              <Button text={'Créer mon projet'}></Button>
            </div>
          </div>
          <div className='relative mobile:hidden'>
            <div className='absolute -right-24'>
              <img className='' src={getImage('image-hero-a3eeeb63c314d9b7036922b7f2e805054864e032a482b4ecac03f92df028cac1.png.png')} alt="" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mobile:grid-cols-1">
          <div className='bg-blue-200 app-container text-center py-12'>
            <h2 className='text-3xl'>Financer un projet</h2>
            <div className='flex justify-center'><img src={getImage('Logo-financer.png')} alt="" /></div>
            <p className='text-blue-600 py-4'>Lancez-vous dans le financement d'un projet existant !</p>
            <p className='py-6 font-semibold'>Découvrez des projets à financer</p>
            <Button text={'Tous les projets'}></Button>
          </div>
          <div className='bg-pink-200 app-container text-center py-12'>
            <h2 className='text-3xl'>Créez mon projet</h2>
            <div className='flex justify-center'><img src={getImage('Logo-crer-projet.png')} alt="" /></div>
            <p className='text-pink-600 py-4'>Osez lancer votre projet !</p>
            <p className='py-6 font-semibold'>Idéal pour tester de nouveaux projets</p>
            <button className='bg-pink-500 text-white px-6 py-2 rounded-lg'>Créez mon projet</button>
          </div>
        </div>
        <div className='bg-purple-400'>
          <div className="app-container py-12">
            <h2 className='text-4xl font-semibold text-center text-white'>Découvrez notre sélection de projets susceptibles de vous captiver !</h2>
            <div className='py-12'>
              <Slider {...settings}>
              {projects &&
                projects.filter(item => item.ETAT == 'En cours').map((item, index) => (
                  <div>
                    <CardProject projet={item} />
                  </div>
                ))
              }
              </Slider>
            </div>
          </div>
        </div>
        <div className='bg-pink-400'>
          <div className="app-container py-12">
            <h2 className='text-4xl font-semibold text-center'>Projets terminés !</h2>
            <div className='py-12'>
            <Slider {...settings}>
              {projects &&
                projects.filter(item => item.ETAT == 'Terminée').map((item, index) => (
                  <CardProject projet={item} />
                ))
              }
              </Slider>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomePage