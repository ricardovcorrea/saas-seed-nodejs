import express from 'express';
import Logger from '../helpers/logger';
import path from 'path';

import ClientsController from '../api/controllers/admin/clientsController';

import { Service, Container } from 'typedi';
import asyncHandler from 'express-async-handler';

@Service()
export default class Router {
    constructor(private logger: Logger, private clientsController: ClientsController) { }

    async setup(app) {
        const setups = [
            this.configAdminRoutes(app),
            this.configClientRoutes(app)
        ];

        await Promise.all(setups);
    }

    async configAdminRoutes(app) {
        this.logger.log('Configurating admin routes...');

        const adminRouter = express.Router();
        adminRouter.get('/', (req, res) => {
            const finalPath = path.join(Container.get('rootPath'), '/admin/build/index.html');

            res.sendFile(finalPath);
        })

        const clientsController = express.Router();
        clientsController.post('/create', asyncHandler((...args) => this.clientsController.create(...args)));


        adminRouter.use('/client', clientsController);
        app.use('/admin', adminRouter);
    }

    async configClientRoutes(app) {
        this.logger.log('Configurating client routes...');

        const clientRouter = express.Router();
        app.use('/api', clientRouter);
    }
}