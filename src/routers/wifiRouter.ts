import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';
import schemaValidate from '../middlewares/schemaValidate.js';
import { createWifi, deleteWifi, getWifi } from '../controllers/wifiController.js';
import { wifiSchema } from '../schemas/wifiSchema.js';

const wifiRouter = Router();

wifiRouter.use(tokenValidate);

wifiRouter.post('/wifi', schemaValidate(wifiSchema), createWifi);
wifiRouter.delete('/wifi/:id', deleteWifi);
wifiRouter.get('/wifi', getWifi);

export default wifiRouter;