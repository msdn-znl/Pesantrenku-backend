class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.name='BadRequestError'
        this.statusCode=400
    }
}
class UnauthorizedError extends Error{
    constructor(message){
        super(message)
        this.name='UnauthorizedError'
        this.statusCode=401
    }
}
class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.name='NotFoundError'
        this.statusCode=404
    }
}
class DatabaseError extends Error{
    constructor(message){
        super(message)
        this.name='DatabaseError'
        this.statusCode=500
    }
}

module.exports = {
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    DatabaseError
}