const sql = require('./db.js');
const SqlUtils = require('../util/sqlUtil');

const PromotionImage = function(promotionImage) {
    this.image_url = promotionImage.image_url;
    this.promotion_id = promotionImage.promotion_id;
};

//add promotion image
PromotionImage.create = async (newPromotionImage) =>{
  console.log("asfafasfawa"+newPromotionImage.image_url);
  let stmt = "INSERT INTO promotion_images SET ? ";
  let value = newPromotionImage;
  return await SqlUtils.createRecord(stmt,value);
};

//get all promotion image
PromotionImage.getAll = async(pid)=>{
  let queryPromotionImage = "SELECT * FROM promotion_images";
  if(pid){
    queryPromotionImage += ` WHERE promotion_id = '${pid}'`;
  }
  try{
    return await SqlUtils.retrieveRecord(queryPromotionImage);
  }catch(e){
    return e;
  }
  
}

module.exports = PromotionImage;