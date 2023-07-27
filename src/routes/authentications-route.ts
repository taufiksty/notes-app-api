import express from 'express';
import {
	deleteAuthenticationHandler,
	postAuthenticationHandler,
	putAuthenticationHandler,
} from '../controllers/authentications-controller';

const router = express.Router();

router
	.route('/')
	.post(postAuthenticationHandler)
	.put(putAuthenticationHandler)
	.delete(deleteAuthenticationHandler);

export default router;
