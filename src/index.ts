import { AppDataSource } from "./data-source"
import express from 'express'
import logger from './logger' 
import { SkillBuilders } from "ask-sdk"
import LaunchRequestHandler from "./handlers/launch-request"
import IntentHandler from "./handlers/intent"
import { ExpressAdapter } from "ask-sdk-express-adapter"

AppDataSource.initialize().then(async () => {
    const app = express();

    // Middleware function to log incoming requests
    app.use((req, res, next) => {
    logger.info('Incoming request');
    next();
    });

    const skillBuilder = SkillBuilders.custom();

    skillBuilder.addRequestHandlers(
    LaunchRequestHandler,
    IntentHandler,
    );

    const adapter = new ExpressAdapter(skillBuilder.create(), false, false);

    app.post('/', adapter.getRequestHandlers());

    app.listen(3000, () => {
    logger.info('Server is running on port 3000');
    });

}).catch(error => console.log(error))
