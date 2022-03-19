const sql = require('./db.js');
const SqlUtils = require('../util/sqlUtil');

const PromotionSubCategory = function(promotionSubCategory) {
    this.category_id = promotionSubCategory.category_id;
    this.perant_category_id = promotionSubCategory.perant_category_id;
};

//add sub category
PromotionSubCategory.create = async (newPromotionSubCategory) =>{
  let stmt = "INSERT INTO promotion_sub_categories SET ? ";
  let value = newPromotionSubCategory;
  return await SqlUtils.createRecord(stmt,value);
};

//get all sub category
PromotionSubCategory.getAll = async(parentCategoryId)=>{
  let queryPromotionImage = "SELECT pc.name, pc.id FROM promotion_sub_categories psc, promotion_categories pc WHERE psc.category_id  = pc.id";
  if(parentCategoryId){
    queryPromotionImage += ` AND parent_category_id = '${parentCategoryId}'`;
  }
  try{
    return await SqlUtils.retrieveRecord(queryPromotionImage);
  }catch(e){
    return e;
  }
  
}

module.exports = PromotionSubCategory;