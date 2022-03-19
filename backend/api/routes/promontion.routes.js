
module.exports = function(app){
    var promotion = require('../controller/promotionController');
    var category = require('../controller/categoryController');
    var promotionRouter = require('express').Router();
    var categoryRouter = require('express').Router();
    promotionRouter.post("/",promotion.create);
    promotionRouter.get("/", promotion.findAll);
    app.use('/api/promotion',promotionRouter);

    categoryRouter.post("/",category.create);
    categoryRouter.get("/", category.findAll);
    app.use('/api/category',categoryRouter);
    
}