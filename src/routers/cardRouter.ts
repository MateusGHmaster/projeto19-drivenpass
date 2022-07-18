import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';
import schemaValidate from '../middlewares/schemaValidate.js';
import { cardSchema } from '../schemas/cardSchema.js';
import { createCard, deleteCard, getCard } from '../controllers/cardController.js';

const cardRouter = Router();

cardRouter.use(tokenValidate);

cardRouter.post('/cards', schemaValidate(cardSchema), createCard);
cardRouter.delete('/cards/:id', deleteCard);
cardRouter.get('/cards', getCard);

export default cardRouter;