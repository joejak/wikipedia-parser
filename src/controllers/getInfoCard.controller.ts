import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from './interfaces/IControllerBase.interface'

class getInfoCardController implements IControllerBase {
    public path = '/getInfoCard'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/getInfoCard', this.index)
    }

    async getPage(reqQuery):Promise<string>{
        console.log("getPage", reqQuery); 
        const axios = require('axios'); 
        var url = reqQuery.url; 
        console.log(url); 
        let config = {
            responseType: 'text/html'
        }
        if(url){
            var res = axios.get(url, config)
                .then(response =>{
                    //console.log(response.data); 
                    return response.data;  
                })
                .catch(err =>{
                    //console.log(err); 
                    res = err; 
                })
        } 
        console.log("returning"); 
        return res; 
    }

    index = (req: Request, res: Response) => {
        console.log("index"); 
        this.getPage(req.query)
            .then(resolve =>{
                console.log("resolve"); 
                console.log(resolve); 
                res.status(200).send(JSON.stringify(resolve));  
            })
            .catch(err =>{
                console.log("error"); 
                res.status(500).send("<html><h1>ERROR CODE:500</h1><p>"+JSON.stringify(err)+"<p></html>")
            })
    }
}

export default getInfoCardController