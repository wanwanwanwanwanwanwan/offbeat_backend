const sql = require('./db.js');
const SqlUtils = require('../util/sqlUtil');
const PromotionSubCategory = require('./promotionSubCategoryModel');
const Category = function(category) {
    this.id = category.id
    this.name = category.name;
    this.parentCatIdList = category.parentCatIdList;
};

//create category
Category.create = async (newCategory, result) =>{
  let stmtCreate = "INSERT INTO promotion_categories (name) VALUES(?) ";
  let valuesCat = [newCategory.name];
  try{
    let catgeoryId = await SqlUtils.createRecord(stmtCreate,valuesCat);
    //create sub cat record if have parentCatId
    if(newCategory.parentCatIdList){
      for(const parentCatId of newCategory.parentCatIdList){
        let stmtCreateSubCat = "INSERT INTO promotion_sub_categories (category_id,parent_category_id) VALUES(?,?) ";
        let valueSubCat = [catgeoryId,parentCatId];
        let createSubCatResponse = await SqlUtils.createRecord(stmtCreateSubCat,valueSubCat);
      }
    }
    return catgeoryId;
  }catch (e){
    return e;
  }
  
};

//get all category information (can use name/category id for condition )
Category.getAll = async(criteriaCategory)=>{

  let queryCategory = "SELECT * FROM promotion_categories";
  let triggerCondition = false;
  console.log("category id",criteriaCategory.id);
  if(criteriaCategory.id){
    queryCategory += ` WHERE id = '${criteriaCategory.id}'`;
    triggerCondition = true;
  }
  if(criteriaCategory.name){
    if(triggerCondition){
      queryCategory += ` AND name LIKE '%${criteriaCategory.name}%'`;
    }else{
      queryCategory += ` WHERE name LIKE '%${criteriaCategory.name}%'`;
    }
  }
 
    try{
      let rawCategoryRecordList =  await SqlUtils.retrieveRecord(queryCategory);
      //convert rawCategoryRecordList to editable
      let categoryList = JSON.parse(JSON.stringify(rawCategoryRecordList))
        for(let categoryInfoIndex in categoryList){
          let childrenList = new Array();
          //get sub category info using category id
          let subCategoryList = await PromotionSubCategory.getAll(categoryList[categoryInfoIndex].id);
          
          //get sub catgoer
          if(subCategoryList.length>0){
            for(const subCat of subCategoryList){
              childrenList.push(subCat);
            }
            
         }
         
         categoryList[categoryInfoIndex].subCategoryCount = childrenList.length;
         categoryList[categoryInfoIndex].children = childrenList;
        }
        return categoryList;

    }catch (e){
      return e
    }
      
}

module.exports = Category;