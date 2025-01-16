"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
const app_1 = require("./app");
const config_1 = require("./config/config");
const app = new app_1.App();
app.listen(config_1.config.port);
