import { Router } from 'express';
import { tokenValidate } from '../middlewares/tokenValidate.js';
import schemaValidate from '../middlewares/schemaValidate.js';
import { noteSchema } from '../schemas/noteSchema.js';
import { createNote, deleteNote, getNotes } from '../controllers/noteController.js';

const noteRouter = Router();

noteRouter.use(tokenValidate);

noteRouter.post('/notes', schemaValidate(noteSchema), createNote);
noteRouter.delete('/notes/:id', deleteNote);
noteRouter.get('/notes', getNotes);

export default noteRouter;