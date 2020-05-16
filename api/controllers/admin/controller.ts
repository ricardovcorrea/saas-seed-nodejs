import express from 'express';
import { Container } from "typedi";

import DatabaseConnection from '../../../database/connection';

export default class ClientsController {
    static prefix = '/admin/client';

    constructor(app: any) {
        const router = express.Router();

        router.post('/create', ClientsController.create);

        app.use(ClientsController.prefix, router);
    }

    static async create(req, res, next) {
        let databaseConnection = Container.get(DatabaseConnection);

        await databaseConnection.createClientConnection(req.query.client);

        res.send('Success!');
    }
}