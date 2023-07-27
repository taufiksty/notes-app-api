/** istanbul ignore file */
import prisma from '../../database/prisma';

const CollaborationTableTestHelper = {
	async cleanTable() {
		await prisma.collaboration.deleteMany();
	},
};

export default CollaborationTableTestHelper;
