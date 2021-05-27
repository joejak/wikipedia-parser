import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from './interfaces/IControllerBase.interface'
import domParser from '../domParser'; 

class raw implements IControllerBase {
    public path = '/raw'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/raw', this.index)
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
        return res; 
    }

    index = (req: Request, res: Response) => {
        console.log("index"); 
        this.getPage(req.query)
            .then(resolve =>{
                let dp = new domParser(); 
                var json; 
                dp.getJSON(resolve).then(x => {
                    json = x; 
                    console.log("json", json); 
                    res.status(200).json(json);  
                }); 
              
            })
            .catch(err =>{
                console.log("error"); 
                res.status(500).send("<html><h1>ERROR CODE:500</h1><p>"+JSON.stringify(err)+"<p></html>")
            })
    }
}

export default raw