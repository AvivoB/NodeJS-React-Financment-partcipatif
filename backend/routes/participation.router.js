    // Node modules
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bcrypt = require('bcryptjs'); //=> https://www.npmjs.com/package/bcryptjs
    const jwt = require('jsonwebtoken'); //=> https://www.npmjs.com/package/jsonwebtoken
    const {verifytoken} = require('../services/token.service')
    const response = require('../services/response.service') //Load all responce request



    class ParticipationRouter{
        constructor( crud ){
                this.router = express.Router();
                this.crud = crud;
        }

        routes(){
            this.router.post('/add', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        let IdCagnotte, PaymentType, StatutPayment, Amount
                        IdCagnotte = req.body.IdCagnotte
                        PaymentType = req.body.PaymentType
                        StatutPayment = req.body.StatutPayment
                        Amount = req.body.Amount
        
                        if(!IdCagnotte || !PaymentType || !StatutPayment || !Amount){
                            return response.BadRequest(res)
                        }
                        
                        let DateNow = Math.floor(new Date().getTime() / 1000);

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`INSERT INTO participation (IDCAGNOTTE, IDUSER, DATE_TIMESTAMP, PAIEMENT_TYPE, STATUT_PAIEMENT, AMOUNT) VALUES (?,?,?,?,?,?)`, [IdCagnotte, decoded.idUser, DateNow, PaymentType, StatutPayment, Amount], res, (results) =>{
                            return response.Ok(res, results)
                        })
                    }
                })
            })

            this.router.put('/StatutPayment', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        
                        let StatutPayment, IdParticipation
                        StatutPayment = req.body.StatutPayment
                        IdParticipation = req.body.IdParticipation

                    if(!IdParticipation || !StatutPayment){
                        return response.BadRequest(res)
                    }

                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`UPDATE participation SET STATUT_PAIEMENT=? WHERE participation.id = ?`, [StatutPayment, IdParticipation], res, (results) =>{
                            return response.Ok(res, null)
                        })
                    }
                })
            })

            this.router.get('/User', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        decoded = jwt.verify(req.token, process.env.SERVER_JWT_SECRET); 
                        this.crud.send(`SELECT * FROM participation WHERE participation.IDUSER = ?`, [decoded.idUser], res, (results) =>{
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

    module.exports = ParticipationRouter;

