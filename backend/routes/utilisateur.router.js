    // Node modules
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bcrypt = require('bcryptjs'); //=> https://www.npmjs.com/package/bcryptjs
    const jwt = require('jsonwebtoken'); //=> https://www.npmjs.com/package/jsonwebtoken
    const {verifytoken} = require('../services/token.service')
    const response = require('../services/response.service') //Load all responce request



    class UtilisateurRouter{
        constructor( crud ){
                this.router = express.Router();
                this.crud = crud;
        }

        routes(){
            this.router.get('/data', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`SELECT * FROM utilisateur as user WHERE user.id = ?`, [decoded.idUser], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })

            this.router.put('/email', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        let Email = req.body.Email
        
                    if(!Email){
                        return response.BadRequest(res)
                    }

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`UPDATE utilisateur SET utilisateur.EMAIL=? WHERE utilisateur.id = ?`, [Email, decoded.idUser], res, (results) =>{
                            return response.Ok(res, {
                                token : jwt.sign(
                                    {
                                        idUser: decoded.idUser,
                                        email: Email,
                                        password: decoded.password
                                    },
                                    process.env.SERVER_JWT_SECRET
                                    ),
                            })
                        })
                    }
                })
            })

            this.router.put('/password', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        let Password = req.body.Password
        
                    if(!Password){
                        return response.BadRequest(res)
                    }
                        Password = bcrypt.hashSync(Password, 10);

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`UPDATE utilisateur SET utilisateur.PASSWORD=? WHERE utilisateur.id = ?`, [Password, decoded.idUser], res, (results) =>{
                            return response.Ok(res, {
                                token : jwt.sign(
                                    {
                                        idUser: decoded.idUser,
                                        email: decoded.email,
                                        password: req.body.Password
                                    },
                                    process.env.SERVER_JWT_SECRET
                                    ),
                            })
                        })
                    }
                })
            })

            this.router.put('/adress', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        let Adress, Cp, Ville, NumAdresse
                        Adress = req.body.Adress
                        Cp = req.body.Cp
                        Ville = req.body.Ville
                        NumAdresse = req.body.NumAdresse
        
                    if(!Adress || !Cp || !Ville || !NumAdresse){
                        return response.BadRequest(res)
                    }

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`UPDATE utilisateur SET ADRESS=?, CP=?, VILLE=?, NUMADRESSE=? WHERE utilisateur.id = ?`, [Adress, Cp, Ville, NumAdresse, decoded.idUser], res, (results) =>{
                            return response.Ok(res, null)
                        })
                    }
                })
            })

            this.router.put('/tel', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        
                        let Tel
                        Tel = req.body.Tel

                    if(!Tel){
                        return response.BadRequest(res)
                    }

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`UPDATE utilisateur SET Tel=? WHERE utilisateur.id = ?`, [Tel, decoded.idUser], res, (results) =>{
                            return response.Ok(res, null)
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

    module.exports = UtilisateurRouter;

