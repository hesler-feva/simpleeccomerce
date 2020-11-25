var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;

class ProductsModel{
    constructor(){
      this.collection = null
      MongoDB.getDb()
       .then (
         (db)=>{
           this.collection = db.collection("ordenes");
         }
      )
       .catch((ex)=>{
        throw(ex);
      });
    }

    async getAll(){
      try {
        let rslts = await this.collection.find({}).toArray();
        return rslts;
      }catch(ex){
        throw(ex);
      }
    }

    async getById(id){
      try{
        const _id = new ObjectID(id);
        let oneDoc = await this.collection.findOne({_id});
        return oneDoc;
      }catch(ex){
        throw(ex);
      }
    }

    async addOne( document ) {
      try{
        var result = await this.collection.insertOne(document);
        return result;
      }catch(ex){
        throw(ex);
      }
    }

    async updateById(id, EstadoOrden){
      try{
        const _id = new ObjectID(id);
        // UPDATE TABLE SET attr = val, attr = val where attr = val;
        const updOps = {"$set":{"EstadoOrden": EstadoOrden}};
        let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal:false});
        return updDoc;
      }catch(ex){
        throw(ex);
      }
    }

    async removeById(id) {
      try{
        const _id = new ObjectID(id);
        let rslt = await this.collection.deleteOne({_id});
        return rslt;
      }catch(ex){
        throw(ex);
      }
    }
    
}
module.exports = ProductsModel;
