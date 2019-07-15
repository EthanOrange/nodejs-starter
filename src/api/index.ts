import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import blog from './routes/blog';

const app = Router();
auth(app);
user(app);
blog(app);

export default app;
