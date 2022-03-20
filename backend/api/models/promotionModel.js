const sql = require('./db.js');
const PromotionImage = require('./promotionImageModel');
const SqlUtils = require('../util/sqlUtil');
const Promotion = function(promotion) {
    this.id = promotion.id
    this.name = promotion.name;
    this.description = promotion.description;
    this.category_id = promotion.category_id;
    this.imageUrlList = promotion.imageUrlList;
};

//create promotion
Promotion.create = async(newPromotion, result) =>{
  let stmt = "INSERT INTO promotions (name,description,category_id) VALUES(?,?,?) ";
  let values = [newPromotion.name,newPromotion.description,newPromotion.category_id];

  try{
    let promotionId = await SqlUtils.createRecord(stmt,values);
    //insert promotion image after created promotion
    if(newPromotion.imageUrlList){
      for(let promotionImageIndex in newPromotion.imageUrlList){
        //create new Promotion Image 
        const newPromotionImage = new PromotionImage({
            image_url : newPromotion.imageUrlList[promotionImageIndex],
            promotion_id : promotionId});

        let createPromotionResponse = await PromotionImage.create(newPromotionImage);
      }
    }
    return promotionId;
  }catch (e){
    return e
  }  
};

//get all promotion information (can use name/pomotion id for condition )
Promotion.getAll = async(criteriaPromotion)=>{

  let queryPromotion = "SELECT * FROM promotions";
  let triggerCondition = false;

  //check parameter to design criteria
  if(criteriaPromotion.id){
    queryPromotion += ` WHERE id = '${criteriaPromotion.id}'`;
    triggerCondition = true;
  }
  if(criteriaPromotion.name){
    if(triggerCondition){
      queryPromotion += ` AND name LIKE '%${criteriaPromotion.name}%'`;
    }else{
      queryPromotion += ` WHERE name LIKE '%${criteriaPromotion.name}%'`;
    }
  }
  if(criteriaPromotion.category_id){
    if(triggerCondition){
      queryPromotion += ` AND category_id LIKE '%${criteriaPromotion.category_id}%'`;
    }else{
      queryPromotion += ` WHERE category_id LIKE '%${criteriaPromotion.category_id}%'`;
    }
  }

  
 
    try{
      let rawPromotionRecordList =  await SqlUtils.retrieveRecord(queryPromotion);
      //convert rawPromotionRecordList to editable
      let promotionInfoList = JSON.parse(JSON.stringify(rawPromotionRecordList))
        for(let promotionInfoIndex in promotionInfoList){
          let imageUrlList = new Array();
          //get promotion Image using promtion id
          let promtionImageList = await PromotionImage.getAll(promotionInfoList[promotionInfoIndex].id);
  
          if(promtionImageList.length>0){
            for(const imageInfo of promtionImageList){
                imageUrlList.push(imageInfo.image_url);
            }
            
         }
         promotionInfoList[promotionInfoIndex].imageUrlList = imageUrlList;
        }
        return promotionInfoList;

    }catch (e){
      return e
    }
      
}

module.exports = Promotion;