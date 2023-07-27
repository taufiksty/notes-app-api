import prisma from '../../database/prisma';
import { Collaboration } from '@prisma/client';
import { InvariantError } from '../../errors/invariant-error';
import { nanoid } from 'nanoid';

interface Payload {
	noteId: string;
	userId: string;
}

const addCollaboration = async ({ noteId, userId }: Payload) => {
	const id = `collab-${nanoid(16)}`;

	const collaboration: Collaboration = await prisma.collaboration.create({
		data: { id, noteId, userId },
	});

	if (!collaboration) {
		throw new InvariantError('Kolaborasi gagal ditambahkan');
	}

	return collaboration;
};

const deleteCollaboration = async ({ noteId, userId }: Payload) => {
	const collaboration: Collaboration = await prisma.collaboration.delete({
		where: { unique_note_id_and_user_id: { noteId, userId } },
	});

	if (!collaboration) {
		throw new InvariantError('Kolaborasi gagal dihapus');
	}
};

const verifyCollaborator = async ({ noteId, userId }: Payload) => {
	const collaboration: Collaboration | null =
		await prisma.collaboration.findFirst({
			where: { AND: [{ noteId }, { userId }] },
		});

	if (!collaboration) {
		throw new InvariantError('Kolaborasi gagal diverifikasi');
	}
};

export { addCollaboration, deleteCollaboration, verifyCollaborator };
