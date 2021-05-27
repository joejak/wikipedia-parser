import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from './interfaces/IControllerBase.interface'

class HomeController implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
    }

    index = (req: Request, res: Response) => {

        const apicalls = [
            {
                id: 1,
                name: 'info',
                url: '/',
                description: "<this is where you are>"
            },
            {
                id:2,
                name: 'rawHtml',
                url: '/rawHtml',
                description: "gets a raw html dump of the queried page as a JSON object (?url=http(s)://www.host.com/page) <- append to end"
            }
        ]

        res.render('index.pug', { apicalls })
    }
}

export default HomeController