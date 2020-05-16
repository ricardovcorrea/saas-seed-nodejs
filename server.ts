import express from 'express';
import dotenv from 'dotenv';
import { Container } from "typedi";

import App from './core/app';

(async () => {
  try {    
    dotenv.config();
    Container.set("rootPath", __dirname);

    const expressApp = express();
    
    const app = Container.get(App);
    await app.setup(expressApp);
    
    const port = Number.parseInt(process.env.PORT) || 5000;
    expressApp.listen(port, (error: any) => {
      if (error) {
        console.log(error);
      }

      console.log(`Server is listening on port ${port}`);
    });

  } catch (error) {
    console.log(error);
  }

})();