const response = require('../services/response.service') //Load all responce request

class crud{
    constructor(pool){
        this.pool = pool;
    }

    verify(args, res){
        const onlyLettersPattern = /^[A-Za-z-0-9_/%.$ @]+$/
        for(const i in args){
            if(args[i]){

                if(!args[i].toString().match(onlyLettersPattern)){
                    response.BadRequest(res);
                    return false
                }
            }
        }
        return true
    }

    send(sql, args, res, callback){

        let verify = this.verify(args, res);

        if(verify){

            this.pool.getConnection( (err, connection) => {
                if(err){ 
                    response.BadGateway(res, err)
                }else{
                connection.query(sql, args, 
                    (mysqlError, results) => {
                        if( mysqlError ){
                            response.BadGateway(res, mysqlError)
                        }else{
                            callback(results)
                        }
                    })
                this.pool.releaseConnection(connection);
                }
            })
        }


    }
}

module.exports = {
    crud
}
