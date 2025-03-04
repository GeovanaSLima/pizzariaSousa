import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';
import path from 'path';
import fileUpload = require('express-fileupload');

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.errorHandler();
    this.routes();
    this.files();
  }

  config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.fileUpload();
  }

  errorHandler() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message,
          });
          return;
        }

        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
        return;
      }
    );
  }

  routes() {
    this.app.use(router);
  }

  listen(port: string) {
    this.app.listen(Number(port), () => console.log('Server running'));
  }

  files() {
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', '..', 'tmp'))
    );
  }

  fileUpload() {
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
  }
}

export { App };
