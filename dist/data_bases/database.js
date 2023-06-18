"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const loadEnvVariables_1 = require("../loadEnvVariables");
const dotenv = require("dotenv");
dotenv.config();
(0, loadEnvVariables_1.loadEnvVariables)();
exports.database = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity{.ts,.js}', 'src/modules/**/*.entity{.ts,.js}'],
    synchronize: false,
};
//# sourceMappingURL=database.js.map