    // Node modules
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bcrypt = require('bcryptjs'); //=> https://www.npmjs.com/package/bcryptjs
    const jwt = require('jsonwebtoken'); //=> https://www.npmjs.com/package/jsonwebtoken
    const {verifytoken} = require('../services/token.service')
    const response = require('../services/response.service') //Load all responce request

    class AuthRouter{
        constructor( crud ){
                this.router = express.Router();
                this.crud = crud;
        }

        routes(){
            this.router.get('/verifytoken', async ( req, res ) => {
                verifytoken(this.crud, req.token, res, (result) => {
                    if(result){
                        return response.Ok(res, null)
                    }
                })
            })
            
            this.router.post('/register', async( req, res ) => {

                let Pseudo, Nom, Prenom, Birthday, Email, Password, Tel, Adress, Cp, Ville, NumAdresse, Genre

                Pseudo = req.body.Pseudo
                Nom = req.body.Nom
                Prenom = req.body.Prenom
                Birthday = req.body.Birthday
                Email = req.body.Email
                Password = req.body.Password
                Tel = req.body.Tel
                Adress = req.body.Adress
                Cp = req.body.Cp
                Ville = req.body.Ville
                NumAdresse = req.body.NumAdresse
                Genre = req.body.Genre
                
                if(!Pseudo || !Nom || !Prenom || !Birthday || !Email || !Password || !Tel || !Adress || !Cp || !Ville || !NumAdresse || !Genre){
                    return response.BadRequest(res);
                }

                if(Password < 8){
                    return response.BadRequest(res);
                }

                Password = bcrypt.hashSync(Password, 10);


                this.crud.send(`INSERT INTO utilisateur (PSEUDO, NOM, PRENOM, BIRTHDAY, EMAIL, PASSWORD, TEL, ADRESS, CP, VILLE, NUMADRESSE, GENRE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [Pseudo, Nom, Prenom, Birthday, Email, Password, Tel, Adress, Cp, Ville, NumAdresse, Genre], res, (result_insert) =>{

                    if(result_insert.insertId){
                            return response.Ok(res, {
                                token : jwt.sign(
                                    {
                                        idUser: result_insert.insertId,
                                        email: Email,
                                        password: req.body.Password
                                    },
                                    process.env.SERVER_JWT_SECRET
                                    ),
                            })
                        
                    }

                })


            })


            this.router.post('/login', async ( req, res ) => {
            
                let Email, Password

                Email = req.body.Email
                Password = req.body.Password

            if(!Email|| !Password){
                return response.BadRequest(res)
            }
            
            this.crud.send(`SELECT * FROM utilisateur as user WHERE user.EMAIL  = ?`, [Email], res, (results) =>{

                if(results.length == 0){
                    return response.Forbidden(res)
                }

                const validatedPassword = bcrypt.compareSync( 
                    Password, 
                    results[0].PASSWORD,
                );

                if(validatedPassword){

                    return response.Ok(res, {
                        token : jwt.sign(
                            {
                                idUser: results[0].ID,
                                email: results[0].EMAIL,
                                password: req.body.Password
                            },
                            process.env.SERVER_JWT_SECRET
                            ),
                    })

                }else{
                    response.Forbidden(res)
                }


            })
            })

        }

        init(){
            this.routes();

            return this.router;
        };
    }

    module.exports = AuthRouter;

