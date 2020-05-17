import express from 'express';
import dotenv from 'dotenv';
import { Container } from "typedi";

import App from './core/app';
import Logger from './helpers/logger';

(async () => {
  dotenv.config();
  Container.set("rootPath", __dirname);

  const logger = Container.get(Logger);
  const app = Container.get(App);

  const expressApp = express();

  await app.setup(expressApp);

  const port = Number.parseInt(process.env.PORT) || 5000;
  expressApp.listen(port, (error: any) => {
    if (error) {
      logger.log(error);
    }

    logger.log(`Server is listening on port ${port}`);
  });

})();