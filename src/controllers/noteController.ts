import { Request, Response } from 'express';
import { CreateNoteData } from '../repositories/noteRepository.js';
import * as noteService from '../services/noteService.js';

export async function createNote (req: Request, res: Response) {
    
    const noteData: CreateNoteData = req.body;

    await noteService.createNote(noteData);

    res.sendStatus(201);

}

export async function deleteNote (req: Request, res: Response) {
    
    const noteId = +req.params.id;
    const { user } = res.locals;

    await noteService.deleteNote(user, noteId);

    res.sendStatus(201);

}

export async function getNotes (req: Request, res: Response) {
    
    const noteId = +req.query.id;
    const { user } = res.locals;

    if (!noteId) {
        const notes = await noteService.getNote_All(user);
        return res.status(201).send(notes);
    }

    const note = await noteService.getNote_One(user, noteId);

    res.status(201).send(note);

}