const req = require('express/lib/request');
const Category = require('../models/promotionCategoryModel');

//create category
exports.create = async(req,res) => {
    //check body is empty or not
    if (!req.body){
        res.status(400).send({
            message : "Content can not be empty!"
        });
    }
    //init category with request body's info
    const category = new Category({
        name: req.body.name,
        parentCatIdList: req.body.parentCategoryId
    });

    try{
        let categoryId = await Category.create(category);
        //return the inserted record to customer to confirm
        const criteriaCategory = new Category({
            id : categoryId
        });
        return res.send(await Category.getAll(criteriaCategory));
    }catch(err){
        return res.status(500).send({
            message:
            err.message || "error found while create category"
        });
    }
    

};

//Retrieve category details
exports.findAll = async(req, res) => {

    try{
        //init category serach criteria with request body's info
        const criteriaCategory = new Category({
            id : req.body.id,
            name: req.body.name
        });

        let name = req.body.name;
        let categoryId = req.body.categoryId;
        return res.send(await Category.getAll(criteriaCategory));
    }catch(err){
        return res.status(500).send({
            message:
            err.message || "error found while retrieving category details"
        });
    }
    

};