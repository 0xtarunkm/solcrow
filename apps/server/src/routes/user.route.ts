import express from 'express';
import { getProfile, login, register } from '../controllers/user.controller';
import { protectUser } from '../middlewares/protectUser';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/user/:id').get(protectUser, getProfile);

export default router;
