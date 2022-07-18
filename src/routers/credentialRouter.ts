import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';
import { createCredentials, deleteCredentials, getCredentials } from '../controllers/credentialController.js';

const credentialRouter = Router();

credentialRouter.use(tokenValidate);
credentialRouter.post('/credentials', createCredentials);
credentialRouter.delete('/credentials/:id', deleteCredentials);
credentialRouter.get('/credentials', getCredentials);

export default credentialRouter;