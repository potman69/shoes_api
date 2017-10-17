const express = require('express');
var router = express.Router();
const Shoes = require('../models/models');



router.get('/shoes/brand/:brandname', function(req, res, next){
  var brandname = req.params.brandname
 Shoes.find({brand: brandname}).then(function(data){
    res.send(data);

  })
})
router.get('/shoes/size/:size', function(req, res, next){
  var size = req.params.size
 Shoes.find({size: size}).then(function(data){
    res.send(data);
  })
})
router.get('/shoes/brand/:brandname/size/:size', function(req, res, next){
  var brandname = req.params.brandname
  var size = req.params.size
 Shoes.find({brand: brandname, size: size}).then(function(data){
    res.send(data);
  })
})



// get list from db
router.get('/shoes', function(req, res, next){
 Shoes.find({}).then(function(data){
    res.send(data);

  })
})

// add new shoe to db
router.post('/shoes', function(req, res, next){
  Shoes.create(req.body).then(function(data){
    res.send(data);
 }).catch(next);

});
// update shoe to db
router.put('/shoes/:id', function(req, res, next){
  Shoes.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
    Shoes.findOne({_id: req.params.id}).then(function(shoes){
      shoes.in_stock = shoes.in_stock - 1;
      shoes.save();
      res.send(shoes);
    });
  });
});
// delete a shoe from db
router.delete('/shoes/:id', function(req, res, next){
  Shoes.findByIdAndRemove({_id: req.params.id}).then(function(shoes){
    res.send(shoes);
  });
});


module.exports = router;
