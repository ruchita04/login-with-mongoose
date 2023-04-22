import express from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../controllers/authenticationController.js";
import {
  createProduct,
  findAllProducts,
  getSingleProduct,
  updateProduct,
  updateProductByQuery,
  deleteProduct,
  deleteProductByName,
  getAggregateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, findAllProducts)
  .post(authenticateUser, authorizeUser("admin", "user"), createProduct)
  .put(authenticateUser, updateProductByQuery)
  .delete(authenticateUser, authorizeUser("admin"), deleteProduct);

router.route("/getAggregateProduct").get(getAggregateProduct);
router
  .route("/:name")
  .get(authenticateUser, getSingleProduct)
  .put(authenticateUser, updateProduct)
  .delete(authenticateUser, authorizeUser("admin"), deleteProductByName);

export default router;
