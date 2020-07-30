import { Router } from 'express';
import * as profileController from '../services/services.profile';
import passport from 'passport'

const jwtMiddle = passport.authenticate('jwt', { session: false })

const router = Router();

router.get('/', jwtMiddle, profileController.profile);
router.post('/signup', profileController.signup);
router.post('/signin', profileController.signin);

export default router;

