import * as Sentry from '@sentry/node';

import path from 'path';
import express from 'express';
import "reflect-metadata";

import { Service, Container } from "typedi";

import bodyParser from 'body-parser';
import compress from 'compression';

import DatabaseManager from '../database/connection';
import Logger from '../helpers/logger';
import Router from '../api/router';

@Service()
export default class App {

    constructor(private logger: Logger, private databaseManager: DatabaseManager, private router: Router) { }

    async setup(app) {
        this.logger.log(`Starting service setup at ${process.env.NODE_ENV}...`);

        const setups = [
            this.configDatabase(),
            this.configExpress(app),
            this.configRoutes(app),
            this.configErrorLogging(app),
        ];

        await Promise.all(setups);
    }

    async configExpress(app: any) {
        this.logger.log('Configurating Express...');

        const finalPath = path.join(Container.get('rootPath'), '/admin/build');

        app.use(bodyParser.json());
        app.use(compress());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(finalPath));
    }

    async configRoutes(app: any) {
        await this.router.setup(app);
    }

    async configDatabase() {
        this.logger.log(`Connecting to ${process.env.NODE_ENV} database...`);

        await this.databaseManager.getCoreConnection();
    }

    async configErrorLogging(app: any) {
        Sentry.init({ dsn: process.env.SENTRY_DSN });

        app.use(Sentry.Handlers.errorHandler());

        app.use((err, req, res, next) => {
            res.statusCode = 500;
            res.end(`Error with id ${res.sentry} has occured!`);
        });
    }
}