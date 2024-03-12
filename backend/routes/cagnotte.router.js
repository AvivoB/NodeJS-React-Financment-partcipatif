    // Node modules
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bcrypt = require('bcryptjs'); //=> https://www.npmjs.com/package/bcryptjs
    const jwt = require('jsonwebtoken'); //=> https://www.npmjs.com/package/jsonwebtoken
    const {verifytoken} = require('../services/token.service')
    const response = require('../services/response.service') //Load all responce request



    class CagnotteRouter{
        constructor( crud ){
                this.router = express.Router();
                this.crud = crud;
        }

        routes(){
            this.router.post('/add', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        let Nom, Description, Objectif, Etat, DateDebut, DateFin
                        Nom = req.body.Nom
                        Description = req.body.Description
                        Objectif = req.body.Objectif
                        Etat = req.body.Etat
                        DateDebut = req.body.DateDebut
                        DateFin = req.body.DateFin
        
                    if(!Nom || !Description || !Objectif || !Etat || !DateDebut || !DateFin){
                        return response.BadRequest(res)
                    }

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`INSERT INTO cagnotte (NOM, DESCRIPTION, OBJECTIF, ETAT, DATEDEBUT, DATEFIN)`, [Adress, Cp, Ville, NumAdresse, decoded.idUser], res, (results) =>{
                            return response.Ok(res, null)
                        })
                    }
                })
            })


            this.router.get('/:id', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`SELECT * FROM utilisateur as user WHERE user.id = ?`, [decoded.idUser], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })



        }

        init(){
            this.routes();

            return this.router;
        };
    }

    module.exports = CagnotteRouter;

