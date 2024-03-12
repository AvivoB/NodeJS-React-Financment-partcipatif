const Ok = (res, data) =>{
    res.status(200).json({ 
        msg: 'OK',
        error: null,
        data: data,
    })   
}

const BadRequest = (res) =>{
    res.status(400).json({ 
        msg: 'Bad Request',
        error: null,
        data: null,
    })
}

const Unauthorized = (res) =>{
    res.status(401).json({ 
        msg: 'Unauthorized',
        error: null,
        data: null,
    })
}

const Forbidden = (res) =>{
    res.status(403).json({ 
        msg: 'Forbidden',
        error: null,
        data: null,
    })
}

const BadGateway = (res, mysqlError) =>{
    res.status(502).json({ 
        msg: 'Bad Gateway ou Proxy Error: MySQL',
        error: mysqlError,
        data: null,
    })
}

const NoContent = (res, data) =>{
    res.status(204).json({ 
        msg: 'No Content',
        error: null,
        data: data,
    })   
}

const NotFound = (res, error) =>{
    res.status(404).json({ 
        msg: 'Not Found',
        error: error,
        data: null,
    })
}

module.exports = {
    Ok,
    BadRequest,
    Unauthorized,
    Forbidden,
    BadGateway,
    NoContent,
    NotFound
}
