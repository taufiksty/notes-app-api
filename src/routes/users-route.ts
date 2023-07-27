import express from 'express';
import {
	addUserHandler,
	getUserByIdHandler,
	getUserByUsernameHandler,
} from '../controllers/users-controller';

const router = express.Router();

router.route('/').get(getUserByUsernameHandler).post(addUserHandler);

router.route('/:id').get(getUserByIdHandler);

export default router;
