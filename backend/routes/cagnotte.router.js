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
                        let Nom, Description, Etat, Objectif, DateDebut, DateFin
                        Nom = req.body.Nom
                        Description = req.body.Description
                        Objectif = req.body.Objectif
                        Etat = "ouvert"
                        DateDebut = req.body.DateDebut
                        DateFin = req.body.DateFin
        
                        if(!Nom || !Description || !Objectif || !DateDebut || !DateFin){
                            return response.BadRequest(res)
                        }

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`INSERT INTO cagnotte (IDUSER, NOM, DESCRIPTION, OBJECTIF, ETAT, DATEDEBUT, DATEFIN) VALUES (?,?,?,?,?,?, ?)`, [decoded.idUser, Nom, Description, Objectif, Etat, DateDebut, DateFin], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })


            this.router.get('/one/:id', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        const id = req.params.id
                        
                        this.crud.send(`SELECT * FROM cagnotte WHERE cagnotte.id = ?`, [id], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })

            this.router.get('/all', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        
                        this.crud.send(`SELECT * FROM cagnotte`, [], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })

            this.router.post('/Cloture', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){

                        let Id = req.body.Id
                        let Etat = "Cloturer"

                        if(!Id){
                            return response.BadRequest(res)
                        }

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`UPDATE cagnotte SET cagnotte.ETAT=? WHERE cagnotte.ID = ? AND cagnotte.IDUSER = ?`, [Etat, Id, decoded.idUser], res, (results) =>{
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

