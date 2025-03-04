import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserControler';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

import uploadConfig from './config/multer';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { DeleteItemController } from './controllers/order/DeleteItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// -- USER ROUTES --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- CATEGORY ROUTES --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// -- PRODUCT ROUTES --
router.post('/product', isAuthenticated, new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListProductByCategoryController().handle);

// -- ORDER ROUTES --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new DeleteOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.delete('/order/remove', isAuthenticated, new DeleteItemController().handle);

router.get('/orders', isAuthenticated, new ListOrdersController().handle);

export { router };
