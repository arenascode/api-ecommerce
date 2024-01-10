import productsService from "../services/products.service.js"

export async function productExist(req, res, next) {
  
  try {
    const productToCreate = req.body
  
    const productExist = await productsService.findProduct({ code: productToCreate.code })
    
    console.log(productExist.length);
    if (productExist.length > 0) {
      console.log(`Product Already Exist!`);
      return res.status(400).json("Product Already Exists")
    }
  
    next()
  } catch (error) {
    res.status(500).json("Internal Server Error")
  }
}