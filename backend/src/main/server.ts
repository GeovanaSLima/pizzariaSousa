import 'tsconfig-paths/register';
import { App } from './app';
import { config } from './config/config';

const app = new App();

app.listen(config.port);
