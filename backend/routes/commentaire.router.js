    // Node modules
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bcrypt = require('bcryptjs'); //=> https://www.npmjs.com/package/bcryptjs
    const jwt = require('jsonwebtoken'); //=> https://www.npmjs.com/package/jsonwebtoken
    const {verifytoken} = require('../services/token.service')
    const response = require('../services/response.service') //Load all responce request



    class CommentaireRouter{
        constructor( crud ){
                this.router = express.Router();
                this.crud = crud;
        }

        routes(){
            this.router.post('/add', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        let IdCagnotte, Commentaire
                        IdCagnotte = req.body.IdCagnotte
                        Commentaire = req.body.Commentaire
        
                        if(!IdCagnotte || !Commentaire){
                            return response.BadRequest(res)
                        }
                        
                        let now = new Date();
                        let DateNow = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`INSERT INTO commentaire (IDUSER, IDCAGNOTTE, DATE, COMMENTAIRE) VALUES (?,?,?,?)`, [decoded.idUser, IdCagnotte, DateNow, Commentaire], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })

            this.router.get('/cagnotte/:id', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        const idcagnotte = req.params.id;
                        this.crud.send(`SELECT utilisateur.PSEUDO, commentaire.* FROM commentaire inner join utilisateur ON utilisateur.ID = commentaire.IDUSER where IDCAGNOTTE = ?`, [idcagnotte], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })

            this.router.delete('/remove/:id', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        const idcommentaire = req.params.id;
                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`DELETE FROM commentaire WHERE commentaire.ID = ? and commentaire.IDUSER = ?`, [idcommentaire, decoded.idUser], res, (results) =>{
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

    module.exports = CommentaireRouter;

