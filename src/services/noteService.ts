import { CreateNoteData } from '../repositories/noteRepository.js';
import { UserToken } from '../repositories/credentialRepository.js';
import * as noteRepository from '../repositories/noteRepository.js';

export async function createNote (noteData: CreateNoteData) {
    
    const note = await noteRepository.checkForTitle(noteData.userId, noteData.title);

    if (note) {
        throw {
            type: 'conflict',
            message: 'Note: title already in use'
        };
    }    

    await noteRepository.insertNoteData(noteData);

}

export async function deleteNote(user: UserToken, noteId: number) {

    const note = await noteRepository.getNoteData_One(user, noteId);
  
    if (!note) {
        throw {
            type: 'not_found',
            message: 'Note: not found'
        };
    }
  
    await noteRepository.deleteNoteData(user, noteId);

    return;

}

export async function getNote_One (user: UserToken, noteId: number) {
    
    const note = await noteRepository.getNoteData_One(user, noteId);

    if (!note) {
        throw {
            type: 'not_found',
            message: 'Note: not found'
        };
    }

    return note;

}

export async function getNote_All (user: UserToken) {
    
    const note = await noteRepository.getNoteData_All(user);

    return note;

}
