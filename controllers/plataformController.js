var Game= require('../models/game');
var Category = require('../models/category');
var Plataform = require('../models/plataform');
var async = require('async');


 exports.plataforms_list=(req,res,next)=>{
    Plataform.find().exec((err,plataforms)=>{
    if(err){return next(err)}
    else{res.render(`plataforms_list`,{title:`Plataforms`,plataforms})}
    })}

    exports.plataforms_details=(req,res,next)=>{
      async.parallel({
          plataform_games:callback=>{
              Game.find({'plataform':req.params.id}).exec(callback)
          },
          plataform:callback=>{
             Plataform.findById(req.params.id).exec(callback)
          },
          
          

      },function(err,results){
          if(err){return next(err)}
          if(results.plataform===null){
              let err=new Error('Plataform not found')
              err.status=404
              return next(err)
          }
          
          res.render('plataforms_details',{title:`Category Games`,plataform:results.plataform,plataform_games:results.plataform_games})

      })
  }

  exports.plataforms_create=(req,res)=>{
    res.render(`plataforms_create`,{title:`Plataform`})
    }