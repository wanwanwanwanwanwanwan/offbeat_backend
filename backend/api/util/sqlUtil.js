const sql = require('../models/db');

exports.createRecord =   async(stmt,values)=>{
    return new Promise(function (resolve,reject){
        sql.query(stmt, values, (error,res) => {
            if(error){
              console.log("error found in create promotion, ",error);
              return reject(error);
            }
             //if have parent category id then insert to promotion images
           console.log("created sql success, " ,{id: res.insertId}); 
           return resolve(res.insertId);
        }) 
    });
}

exports.retrieveRecord =  async(stmt)=>{
    return new Promise(function (resolve,reject){
        sql.query(stmt, (error,res) => {
            if(error){
              console.log("error found in create promotion, ",error);
              return reject(error);
            }
            
           console.log("retrieveRecord success, " ,res); 
           return resolve(res);
        }) 
    });
    
}

