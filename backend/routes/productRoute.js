const express = require("express");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
const { getAllProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductDetails,
        createProductReview,
        getProductReviews,
        deleteReview
 } = require("../controllers/productController");

const router = express.Router();

router.route("admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getProductDetails)
router.route("admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.route("admin/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews)
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);


module.exports=router