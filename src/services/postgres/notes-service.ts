import { nanoid } from 'nanoid';

import prisma from '../../database/prisma';
import { Note } from '@prisma/client';
import { NotFoundError } from '../../errors/notfound-error';
import { AuthorizationError } from '../../errors/authorization-error';
import { verifyCollaborator } from './collaborations-service';
import { InvariantError } from '../../errors/invariant-error';

interface Payload {
	id?: string;
	title: string;
	body: string;
	tags: string[];
	owner: string;
}

const addNote = async ({ title, body, tags, owner }: Payload) => {
	const id: string = `note-${nanoid(16)}`;

	const addedNote: Note = await prisma.note.create({
		data: { id, title, body, tags, owner: owner as string },
	});

	return addedNote;
};

const editNoteById = async ({ id, title, body, tags, owner }: Payload) => {
	const note: Note | null = await prisma.note.update({
		where: { id },
		data: { title, body, tags },
	});

	if (!note) {
		throw new NotFoundError(
			`Catatan gagal diperbarui. Id ${id} tidak ditemukan`,
		);
	}
};

const deleteNoteById = async ({ id }: { id: string }) => {
	const note: Note | null = await prisma.note.delete({ where: { id } });

	if (!note) {
		throw new NotFoundError(`Catatan gagal dihapus. Id ${id} tidak ditemukan`);
	}
};

const getNotes = async ({ owner }: { owner: string }) => {
	const notes: Note[] = await prisma.note.findMany({ where: { owner } });

	return notes;
};

const getNoteById = async ({ id }: { id: string }) => {
	const note: Note | null = await prisma.note.findFirst({ where: { id } });

	if (!note) {
		throw new InvariantError(`Catatan dengan id ${id} tidak ditemukan`);
	}

	return note;
};

const verifyNoteOwner = async ({
	id,
	owner,
}: {
	id: string;
	owner: string;
}) => {
	const note: Note | null = await prisma.note.findFirst({ where: { id } });

	if (!note) {
		throw new NotFoundError(`Catatan dengan id ${id} tidak ditemukan`);
	}

	if (note.owner !== owner) {
		throw new AuthorizationError('Anda tidak berhak mengakses catatan ini');
	}
};

const verifyNoteAccess = async ({
	id,
	userId,
}: {
	id: string;
	userId: string;
}) => {
	try {
		await verifyNoteOwner({ id, owner: userId });
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		}

		try {
			await verifyCollaborator({ noteId: id, userId });
		} catch (error) {
			throw error;
		}
	}
};

export {
	addNote,
	editNoteById,
	deleteNoteById,
	getNotes,
	getNoteById,
	verifyNoteAccess,
	verifyNoteOwner,
};
