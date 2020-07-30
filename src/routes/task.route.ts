import { Router } from 'express';
import * as taskController from '../services/services.tasks';
import passport from 'passport';

const jwtMiddle = passport.authenticate('jwt', { session: false });


const router = Router();


router.post('/task', jwtMiddle, taskController.createTask);
router.get('/tasks', jwtMiddle, taskController.getTasks);

export default router;