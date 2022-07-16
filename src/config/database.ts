/* import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma; */

import pg from 'pg';
import './setup.js';

const { Pool } = pg;

const configDatabase = {

  connectionString: process.env.DATABASE_URL,
  ssl: null

};

if (process.env.MODE === "PROD") {

  configDatabase.ssl = {
    rejectUnauthorized: false

  };
}

const connection = new Pool(configDatabase);
export default connection;