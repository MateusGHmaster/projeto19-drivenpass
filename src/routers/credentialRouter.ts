import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';

const credentialRouter = Router();

credentialRouter.use(tokenValidate);



export default credentialRouter;