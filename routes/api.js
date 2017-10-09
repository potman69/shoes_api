const express = require('express');
var router = express.Router();
const Shoes = require('../models/models');


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
