import { Router, RequestHandler } from 'express';
import { login, getTimeToken, updateToken, getAllUsers, saveUser, updateUser, deleteUser } from '../controller/auth.controller';

const router = Router();

// Ruta para login con validación
router.post('/login', login as RequestHandler);

router.get('/getTokenTime', getTimeToken as RequestHandler);

router.patch('/updateToken/:userId', updateToken as RequestHandler);

router.get('/getAllUsers', getAllUsers as RequestHandler);

router.post('/save', saveUser as RequestHandler);

router.put('/update/:id', updateUser as RequestHandler);

router.delete('/delete/:id', deleteUser as RequestHandler);

export default router;