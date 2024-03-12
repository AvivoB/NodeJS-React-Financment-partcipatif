/* Import */

require('dotenv').config({path: './backend/.env'}); // https://www.npmjs.com/package/dotenv
const express = require('express'); // https://www.npmjs.com/package/express
const mysql = require('mysql2'); // https://www.npmjs.com/package/mysql2
const bearerToken = require('express-bearer-token'); // https://www.npmjs.com/package/express-bearer-token
const {crud} = require('./services/mysql.service')
//const fileUpload = require('express-fileupload');


const AuthRouterClass = require('./routes/auth.router');
const UtilisateurRouter = require('./routes/utilisateur.router')
const CagnotteRouter = require('./routes/cagnotte.router')

/* Server classe */

class ServerClass {
    // Inject value into the classe
    constructor(){
        // Set server properties
        this.app = express();
        
        //this.app.use(fileUpload()); upload fichier
        //this.app.use(cors())
        this.port = process.env.PORT;

        // Define server
        this.server = require('http').Server(this.app)

        // Define MYSQL connection
        this.pool = mysql.createPool({
            host: process.env.DB_URL,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
            debug: false
        })

        this.crud = new crud(this.pool)



        this.app.use( (request, response, next) => {
            /* 
                [SECURITY] CORS
                Define allowed access
            */
                response.setHeader('Access-Control-Allow-Origin', "*")
                response.header('Access-Control-Allow-Credentials', true);
                response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                response.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
            //
                if(request.method === 'OPTIONS'){ response.sendStatus(200) }
                else{
                    next();
                }
            //
        })

    }



    // Method to initiate server
    init(){
        // Set static folder
        this.app.set( 'views', __dirname + '/www' );
        //this.app.use( express.static( path.join(__dirname, 'www') ) );

        // Set view engine
        this.app.set('view engine', 'ejs');

        // Set body request
        this.app.use( express.json({ limit: '20mb' }) );
        this.app.use( express.urlencoded({ extended: true }) );

        // BearerToken
        this.app.use(bearerToken());

        // Bind HTTP request
        this.bindRoutes();
    }



    // Method to define serveur routes
    bindRoutes(){

        // Init router classe
        const authRouter = new AuthRouterClass( this.crud );
        const utilisateurRouter = new UtilisateurRouter( this.crud );
        const cagnotteRouter = new CagnotteRouter( this.crud );

        // Add router in server app
        this.app.use( '/api/auth', authRouter.init() );
        this.app.use( '/api/utilisateur', utilisateurRouter.init() );
        this.app.use( '/api/cagnotte', cagnotteRouter.init() );
        
        this.launch();
    };

    launch(){
        // Check Connection to the DDB server

        this.pool.getConnection( (err, connection) => {
            // Check error
            if(err){ 
                console.log('DDB error', err) 
                setTimeout(() => {
                    this.launch();
                }, 2000);
            }else{
                console.log("Connection DDB successful")
                this.pool.releaseConnection(connection);
            }
        })


        // Launch
        this.server.listen( this.port, () => {
            // Debug
            console.log({
                node: `http://localhost:${this.port}`
            })
            
        })
            
        
    }
}


//

/* 
Start server
*/
const PanelStaffServer = new ServerClass();
PanelStaffServer.init();
//