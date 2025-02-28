import express from 'express';
import { login, register, verify } from '../controllers/auth.js';
import middleware from '../middleware/middleware.js';



const router = express.Router();



router.post('/register', register);
router.post('/login', login);
//router.post('/verify', middleware, verify);
router.get('/verify', middleware, verify);


export default router;