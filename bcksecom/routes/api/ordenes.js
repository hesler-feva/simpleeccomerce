const express = require("express");
let router = express.Router();

const ProductModelClass = require('../../models/ordenes.model');
const mdbProductModel = new ProductModelClass();

router.get('/all', async (req, res)=>{
  try{
    const rslt = await mdbProductModel.getAll()
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({"msg":"Algo Paso Mal."});
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    let oneDocument = await mdbProductModel.getById(id);
    res.status(200).json(oneDocument);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});


router.post('/new', async (req, res)=>{
  try{
    let { name, correo, telefono, producto, FrmPago, EstadoOrden} = req.body;
    telefono = Number(telefono);
    var rslt = await mdbProductModel.addOne({ name, correo, telefono, producto, FrmPago, EstadoOrden}); 
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.put('/upd/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    //id = Number(id);
    let { EstadoOrden } = req.body;
    let rslt = await mdbProductModel.updateById(id, EstadoOrden);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.delete('/del/:id',async (req, res)=>{
  let {id} = req.params;
  try{
    let rslt = await mdbProductModel.removeById(id);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

module.exports = router;