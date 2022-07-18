import prisma from '../config/database.js';
import { notes } from '@prisma/client';
import { UserToken } from './credentialRepository.js';
import { PrismaClientRustPanicError } from '@prisma/client/runtime/index.js';

export type CreateNoteData = Omit<notes, 'id'>;

export async function checkForTitle (userId: number, noteTitle: string) {
    
    const note = await prisma.notes.findFirst({ where: { userId, title: noteTitle } });

    return note;

}

export async function deleteNoteData (user: UserToken, noteId: number) {
    
    await prisma.notes.deleteMany({ where: { userId: user.id, id: noteId } });

    return;

}

export async function insertNoteData (noteData: CreateNoteData) {
    
    await prisma.notes.create({ data: noteData });

}

export async function getNoteData_One (user: UserToken, noteId: number) {
    
    const note = await prisma.notes.findFirst({ where: { userId: user.id, id: noteId } });

    return note;

}

export async function getNoteData_All (user: UserToken) {
    
    const note = await prisma.notes.findMany({ where: { userId: user.id } });

    return note;

}