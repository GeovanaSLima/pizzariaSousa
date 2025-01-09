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
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListProductByCategoryController().handle);

export { router };
