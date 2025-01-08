import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.errorHandler();
    this.routes();
  }

  config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
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

  listen(port: number) {
    this.app.listen(port, () => console.log('Server running'));
  }
}

export { App };
