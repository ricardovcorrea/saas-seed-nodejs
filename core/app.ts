import * as Sentry from '@sentry/node';

import path from 'path';
import express from 'express';
import "reflect-metadata";

import { Service, Container } from "typedi";

import DatabaseConnection from '../database/connection';

import bodyParser from 'body-parser';
import compress from 'compression';
import glob from 'glob';

@Service()
export default class App {

    async setup(app) {
        const setups = [
            this.configExpress(app),
            this.configDatabase(),
            this.configRoutes(app),
            this.configStaticFiles(app),
            this.configErrorLogging(app),
        ];

        await Promise.all(setups);
    }

    async configExpress(app: any) {
        app.use(bodyParser.json());
        app.use(compress());
        app.use(bodyParser.urlencoded({ extended: true }));
    }

    async configRoutes(app: any) {
        const adminControllers = glob.sync(`${Container.get('rootPath')}/api/controllers/admin/*.ts`);
        const coreControllers = glob.sync(`${Container.get('rootPath')}/api/controllers/core/*.ts`);

        for (let controllerPath of [...adminControllers, ...coreControllers]) {
            const Controller = require(controllerPath);
            new Controller.default(app);
        }

        app.get('/', (req, res) => {
            const finalPath = path.join(Container.get('rootPath'), '/admin/build/index.html')
            res.sendFile(finalPath);
        });
    }

    async configDatabase() {
        let databaseConnection = Container.get(DatabaseConnection);

        await databaseConnection.setup();
    }

    async configStaticFiles(app: any) {
        const finalPath = path.join(Container.get('rootPath'), '/admin/build');
        app.use(express.static(finalPath));
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