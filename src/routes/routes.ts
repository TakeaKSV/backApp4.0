import { Router, RequestHandler } from 'express';
import { login, getTimeToken, updateToken, getAllUsers, saveUser, updateUser, deleteUser } from '../controller/auth.controller';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controller/product.controller';
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controller/order.controller';
    import { getAccessibleMenus, } from '../controller/menu.controller';

const router = Router();

// Ruta para login con validación
router.post('/login', login as RequestHandler);

router.get('/getTokenTime', getTimeToken as RequestHandler);

router.patch('/updateToken/:userId', updateToken as RequestHandler);

router.get('/getAllUsers', getAllUsers as RequestHandler);

router.post('/save', saveUser as RequestHandler);

router.put('/update/:id', updateUser as RequestHandler);

router.delete('/delete/:id', deleteUser as RequestHandler);


// Rutas para productos

router.post('/crearp', createProduct as RequestHandler);

router.get('/getp', getAllProducts as RequestHandler);

router.get('/getp/:id', getProductById as RequestHandler);

router.put('/updatep/:id', updateProduct as RequestHandler);

router.delete('/delete/:id', deleteProduct as RequestHandler);

// Rutas para órdenes

router.post('/crearO', createOrder as RequestHandler);

router.get('/getO', getAllOrders as RequestHandler);

router.get('/get0/:id', getOrderById as RequestHandler);

router.put('/updateO/:id', updateOrder as RequestHandler);

router.delete('/deleteO/:id', deleteOrder as RequestHandler);

// Ruta para menus

router.get("/menus", getAccessibleMenus as RequestHandler);

export default router;