const req = require('express/lib/request');
const Promotion = require('../models/promotionModel');
const PromotionImage = require('../models/promotionImageModel');

//create promotion
exports.create = async(req,res) => {
    //check body is empty or not
    if (!req.body){
        res.status(400).send({
            message : "Content can not be empty!"
        });
    }
    //init promotion with request body's info
    const promotion = new Promotion({
        name: req.body.name,
        description: req.body.description,
        imageUrlList:req.body.imageUrlList,
        category_id:req.body.categoryId
    });
    
    try{
        let promotionId = await Promotion.create(promotion);
        
        //return the inserted record to customer to confirm
        let criteriaPromotion = new Promotion({
            id : promotionId,

        });
        return res.send(await Promotion.getAll(criteriaPromotion));
    }catch(err){
        return  res.status(500).send({
            message: err.message || "error found during create promotion"
            });
    }
};

//Retrieve promotion details
exports.findAll = async(req, res) => {

    try{
        let criteriaPromotion = new Promotion({
            id : req.body.promotionId,
            name: req.body.name,
            description: req.body.description,
            promotionCategoryId: req.body.cateogryId
        });

        return res.send(await Promotion.getAll(criteriaPromotion));
    }catch(err){
        return res.status(500).send({
            message:
            err.message || "error found while retrieving promotion details"
        });
    }
    

};