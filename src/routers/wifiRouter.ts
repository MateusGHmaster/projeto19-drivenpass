import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';

const wifiRouter = Router();

wifiRouter.use(tokenValidate);



export default wifiRouter;