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
                name: 'rawHtmlasJSON',
                url: '/raw',
                description: "gets a raw html dump of the queried page as a JSON object (/raw?url=http(s)://www.host.com/page) <- append to end url in address bar!"
            },
            {
                id: 3,
                name: '(coming soon) getSubElements',
                url: '/', //<-update when ready
                description: "allows us to only grab certain sub elements, even filter for data only, not tags"
            },
            {
                id: 4,
                name: '(coming soon) getScripts',
                url: '/', //<-update when ready
                description: "allows us to only grab script elements for a page"
            }
        ]

        res.render('index.pug', { apicalls })
    }
}

export default HomeController