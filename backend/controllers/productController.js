const { param } = require("../app");
const Product = require("../models/productModel");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => 
{  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};



// get All Product

exports.getAllProducts=async(req,res)=>{
  const product=await Product.find()
  res.status(200).json({success:true,
  product})
  }


  // update product--Admin
exports.updateProduct = async(req,res,next)=>{
  let product = product.findById(req,param.id);
  if(!product){
    return res.status(500).json({
    success:false,
    message:"Product not Found"
    })
  }
  product=await Product.findByIdAndUpdate(req.param.id,req.body,{new:true,
  runValidators:true,
  userFindAndModify:false })

  res.status(200).json({
    success:true,
    product
  })
}
