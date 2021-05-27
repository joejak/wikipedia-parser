import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'
import HomeController from './controllers/home.controller'
import getInfoCardController from './controllers/getInfoCard.controller'
import raw from './controllers/raw.controller'

const app = new App({
    port: process.env.PORT || 8080,
    controllers: [
        new HomeController(),
        new getInfoCardController(),
        new raw()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()