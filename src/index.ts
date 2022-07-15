import express, { json } from 'express';
import './config/setup.js';
import router from './routers/index.js';
import 'express-async-errors';
import cors from 'cors';

const app = express();

app.use(json());
app.use(router);
/*app.use(handleErrorsMiddleware); */

const PORT = +process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Working and running on port ${PORT}!`);

});
