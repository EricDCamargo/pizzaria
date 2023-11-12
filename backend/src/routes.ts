import { Router } from 'express'
import multer from 'multer'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'

import uploadconfig from './config/multer'

const router = Router()

const upload = multer(uploadconfig.upload('./tmp'))

// -- User Routes --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Category Routes --

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// -- Product Routes --

router.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  new CreateProductController().handle
)

export { router }
