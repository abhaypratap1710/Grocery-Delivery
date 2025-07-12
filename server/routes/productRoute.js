// // import express from 'express';
// // import { upload } from '../configs/multer.js';
// // import authSeller from '../middlewares/authSeller.js';
// // import { addProduct, changeStock, productById,  productList } from '../controllers/productController.js';
 
// // const productRouter=express.Router();
// // productRouter.post('/add',upload.array(['images']),authSeller,addProduct)
// // productRouter.get('/list',productList)
// // productRouter.get('/id',productById)
// // productRouter.get('/stock',authSeller,changeStock)



// // export default productRouter;



// import express from 'express';
// import { upload } from '../configs/multer.js';
// import authSeller from '../middlewares/authSeller.js';
// import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

// const productRouter = express.Router();

// // ✅ Add product (Protected + File Upload)
// productRouter.post('/add', upload.array('images'), authSeller, addProduct);

// // ✅ Get all products
// productRouter.get('/list', productList);

// // ✅ Get product by ID (must use POST if sending in body)
// productRouter.post('/id', productById);

// // ✅ Change stock (should also use POST)
// productRouter.post('/stock', authSeller, changeStock);

// export default productRouter;
import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

// ✅ Fix multer field
// productRouter.post('/add', authSeller, upload.array('images'), addProduct);

productRouter.post('/add', upload.array('images'), authSeller, addProduct);

productRouter.get('/list', productList);
productRouter.get('/id', productById);
productRouter.get('/stock', authSeller, changeStock);

export default productRouter;


