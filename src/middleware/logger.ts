import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next:any) => {

    console.log('Request logged:', req.method, req.path, req.ip)
    //typically there would be a post to a logging micro-service of sorts here 
    next()
}

export default loggerMiddleware