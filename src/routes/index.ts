import { Router } from 'express';
import profile from './profile.route';
import task from './task.route';
const app = Router();

app.use('/', task);
app.use('/profile', profile);

export default app;
