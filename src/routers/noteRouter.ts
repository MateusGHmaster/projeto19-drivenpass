import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';

const noteRouter = Router();

noteRouter.use(tokenValidate);



export default noteRouter;