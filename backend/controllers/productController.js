
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander"); 
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {  
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};



// get All Product details

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

   let products = await apiFeature.query.clone();
  

   let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

  // get detail of single product by id

  exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
      return next(ErrorHander ("Product not Found", 404))
       }
  res.status(200).json({
    success:true,
   product 
  })

  })
  


  // update product--Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
  let product = await Product.findById(req.params.id);
  if(!product){
    
      return next(ErrorHander ("Product not Found", 404))
  }
  product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
  runValidators:true,
  userFindAndModify:false })

  res.status(200).json({
    success:true,
    product
  })
})



// Delete Product

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return next(ErrorHander ("Product not Found", 404))
  }
await product.deleteOne()

res.status(200).json({
  success:true,
 message:"product Deleted"
})
}
) 

