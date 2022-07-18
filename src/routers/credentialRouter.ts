import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';
import schemaValidate from '../middlewares/schemaValidate.js';
import { createCredential, deleteCredentials, getCredentials } from '../controllers/credentialController.js';
import { credentialSchema } from '../schemas/credentialSchema.js';

const credentialRouter = Router();

credentialRouter.use(tokenValidate);

credentialRouter.post('/credentials', schemaValidate(credentialSchema), createCredential);
credentialRouter.delete('/credentials/:id', deleteCredentials);
credentialRouter.get('/credentials', getCredentials);

export default credentialRouter;