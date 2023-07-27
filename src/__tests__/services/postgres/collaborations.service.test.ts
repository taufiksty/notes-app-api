import prisma from '../../../database/prisma';
import CollaborationTableTestHelper from '../../../helpers/table-helper/collaboration-table-test-helper';

jest.mock('nanoid', () => ({
	nanoid: jest.fn(() => '123'),
}));

describe('Collaboration service postgres', () => {
	afterEach(async () => {
		await CollaborationTableTestHelper.cleanTable();
	});

	afterAll(async () => {
		await prisma.$disconnect();
	});

	describe('addCollaboration function', () => {
		it('should add collaboration to database', async () => {
			// Arrange
			const payload = {
				noteId: 'note-123',
				userId: 'user-123',
            };
            
		});
	});
});
