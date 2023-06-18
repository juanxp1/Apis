"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvVariables = void 0;
const dotenv = require("dotenv");
const enviroments_1 = require("./enviroments");
dotenv.config();
function loadEnvVariables() {
    if (process.env.NODE_ENV === 'production') {
        dotenv.config({ path: enviroments_1.enviroments.prod });
    }
    else {
        dotenv.config({ path: enviroments_1.enviroments.dev });
    }
}
exports.loadEnvVariables = loadEnvVariables;
//# sourceMappingURL=loadEnvVariables.js.map