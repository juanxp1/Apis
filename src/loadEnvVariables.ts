import * as dotenv from 'dotenv';
import { enviroments } from './enviroments';
dotenv.config();
export function loadEnvVariables() {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: enviroments.prod });
  } else {
    dotenv.config({ path: enviroments.dev });
  }
}
