import express, { json } from 'express';
import router from './routers/index.js';
import './config/setup.js';
import handleErrorMiddleware from './middlewares/handleErrorMiddleware.js';
import 'express-async-errors';

const app = express();

app.use(json());
app.use(router);
app.use(handleErrorMiddleware);

const PORT = +process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Working and running on port ${PORT}!`);

});
