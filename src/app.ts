import express, { Request, Response } from 'express';
import morgan from 'morgan';

import authenticationRoutes from './routes/authentications-route';
import collaborationRoutes from './routes/collaborations-route';
import exportRoutes from './routes/exports-route';
import notesRoutes from './routes/notes-route';
import uploadRoutes from './routes/uploads-route';
import usersRoutes from './routes/users-route';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('hello world');
});

app.use('/api/authentications', authenticationRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', usersRoutes);

export default app;
