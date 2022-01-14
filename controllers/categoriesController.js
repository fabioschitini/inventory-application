var Game= require('../models/game');
var Category = require('../models/category');
var Plataform = require('../models/plataform');
var async = require('async');


exports.categories_list=(req,res,next)=>{
    Category.find().exec((err,categories)=>{
    if(err){return next(err)}
    else{res.render(`categories_list`,{title:`Categories`,categories})}
    })}

    exports.categories_details=(req,res,next)=>{
        async.parallel({
            category_games:callback=>{
                Game.find({'category':req.params.id}).exec(callback)
            },
            category:callback=>{
               Category.findById(req.params.id).exec(callback)
            },
            
            

        },function(err,results){
            if(err){return next(err)}
            if(results.category===null){
                let err=new Error('Category not found')
                err.status=404
                return next(err)
            }
            
            res.render('categories_details',{title:`Category Games`,category:results.category,category_games:results.category_games})

        })
    }

    exports.categories_create=(req,res)=>{
        res.render(`categories_create`,{title:`Add Categorie`})
        }