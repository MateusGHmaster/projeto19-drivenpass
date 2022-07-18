import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';

const cardRouter = Router();

cardRouter.use(tokenValidate);



export default cardRouter;