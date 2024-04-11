import React, { useState } from 'react'
import Header from '../components/Header'
import { getImage } from '../utils/someFunctions'
import Textfield from '../components/TextField'
import Button from '../components/Button'


const Register = () => {

    // const { register } = useAuth();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    

  return (
    <div>
        <Header />
        <div className='py-24 px-[700px] mobile:px-0'>
            <div className='text-center flex items-center justify-center'>
                <img src={getImage('Logo.png')} alt="" />
            </div>
            <h1 className='text-center py-12 text-4xl font-semibold'>Créez un compte</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Textfield label={'Prénom'} value={prenom} onChangeValue={(e) => setPrenom(e.target.value)}  />
                </div>
                <div>
                    <Textfield label={'Nom'} value={nom} onChangeValue={(e) => setNom(e.target.value)}  />
                </div>
            </div>
            <div className='py-4'>
                <Textfield label={'Adresse email'} value={email} onChangeValue={(e) => setEmail(e.target.value)}  />
            </div>
            <div>
                <Textfield label={'Mot de passe'} type='password' value={password} onChangeValue={(e) => setPassword(e.target.value)}  />
            </div>
            <p className='py-4'>
            En cliquant sur Accepter et créer mon compte, je
            déclare avoir plus de 18 ans et j'accepte les
            Conditions Générales d'Utilisation de
            COFONDS.
            </p>
            <div className='w-full '>
                <Button text={'Accepter et créer mon compte'}></Button>
            </div>
        </div>
    </div>
  )
}

export default Register