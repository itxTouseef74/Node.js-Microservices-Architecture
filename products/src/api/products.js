const ProductService = require('../services/product-service');
const {PublishMessage} = require('../utils/index')
const {SHOPPING_BINDING_KEY , CUSTOMER_BINDING_KEY} = require('../config/index.js')
const UserAuth = require('./middlewares/auth')

module.exports = (app , channel) => {
    
    const service = new ProductService();
  


    app.post('/product/create', async(req,res,next) => {
        
        try {
            const { name, desc, type, unit,price, available, suplier, banner } = req.body; 
            // validation
            const { data } =  await service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/category/:type', async(req,res,next) => {
        
        const type = req.params.type;
        
        try {
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/:id', async(req,res,next) => {
        
        const productId = req.params.id;

        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/ids', async(req,res,next) => {

        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            return res.status(200).json(products);
            
        } catch (err) {
            next(err)
        }
       
    });
     
    app.put('/wishlist',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        

        // get payload to send customer service 
        
        try {
            const {data} =  await service.GetProductBypayload(_id, {productId: req.body._id} , 'ADD_TO_WISHLIST')

            console.log("WISHLISHT PRODUCT .JS -----> ",data)


            PublishMessage(channel , CUSTOMER_BINDING_KEY , JSON.stringify(data));
      
            return res.status(200).json(data.data.product);
        } catch (err) {
            console.log("PRODUCT ERROR  - -- - - -> " , err)
        }
    });
    
    app.delete('/wishlist/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const productId = req.params.id;

        try {
            const {data} =  await service.GetProductBypayload(_id, {productId} , 'REMOVE_FROM_WISHLIST')


            PublishMessage(channel , CUSTOMER_BINDING_KEY , JSON.stringify(data));
      
            return res.status(200).json(data.data.product);

        } catch (err) {
            next(err)
        }
    });


    app.put('/cart',UserAuth, async (req,res,next) => {
        
        const { _id } = req.user;
        
        try {     

            const {data} =  await service.GetProductBypayload(_id, {productId: req.body._id, qty: req.body.qty} , 'ADD_TO_CART')


            PublishMessage(channel , CUSTOMER_BINDING_KEY , JSON.stringify(data));
      
            PublishMessage(channel , SHOPPING_BINDING_KEY , JSON.stringify(data));

            const response = {
                product: data.data.product,
                unit:data.data.unit
            }
            return res.status(200).json(response);
            
        } catch (err) {
            next(err)
        }
    });
    
    app.delete('/cart/:id', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const productId = req.params.id;
       
        try {
           
            const qty = 1;
    
    
            const payload = {
                productId,
                qty
            };
    
            const { data } = await service.GetProductBypayload(_id, payload, 'REMOVE_FROM_CART');
    
            
            PublishMessage(channel , CUSTOMER_BINDING_KEY , JSON.stringify(data));
      
            PublishMessage(channel , SHOPPING_BINDING_KEY , JSON.stringify(data));
      
    
            
            const response = {
                product: data.data.product,
                unit: data.data.unit
            };
    
            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    });
    

    
    app.get('/', async (req,res,next) => {
        
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
        
    });
    
}