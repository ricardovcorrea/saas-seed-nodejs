import express from 'express';
import path from 'path';

import bodyParser from 'body-parser';
import compress from 'compression';
import dotenv from 'dotenv';

import * as Sentry from '@sentry/node';

import { createConnection } from 'typeorm';

const configExpress = (app: any) => {
  app.use(bodyParser.json());
  app.use(compress());
  app.use(bodyParser.urlencoded({ extended: true }));
}

const configRoutes = (app: any) => {

  app.get('/teste', (req, res) => {
    throw new Error('My first Sentry error!');
  });

  app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/admin/build/index.html')));
}

const configStaticFiles = async (app: any) => {
  app.use(express.static(path.join(__dirname, 'admin/build')));
}

const configErrorLogging = async (app: any) => {
  Sentry.init({ dsn: process.env.SENTRY_DSN });

  app.use(Sentry.Handlers.errorHandler());

  app.use((err, req, res, next) => {
    res.statusCode = 500;
    res.end(`Error with id ${res.sentry} has occured!`);
  });
}

const configDatabase = async (app: any) => {
  await createConnection();
}

(async () => {
  dotenv.config();

  const expressApp = express();
  const port = Number.parseInt(process.env.PORT) || 5000;

  const setups = [
    configExpress(expressApp),
    configRoutes(expressApp),
    configStaticFiles(expressApp),
    configDatabase(expressApp),
    configErrorLogging(expressApp),
  ];

  await Promise.all(setups);

  expressApp.listen(port, (err: any) => {
    if (err) {
      return console.error(err);
    }

    console.log(`Server is listening on ${port}`);
  });

})();