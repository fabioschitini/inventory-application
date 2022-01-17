var Game= require('../models/game');
var Category = require('../models/category');
var Plataform = require('../models/plataform');
var async = require('async');
const { body,validationResult } = require("express-validator");



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

    exports.categories_create_get=(req,res,next)=>{
        res.render(`categories_create`,{title:`Add Categorie`,category:undefined,errors:[]})
        }

        exports.categories_create_post=[
                
            body('name','Category must contain at least 3 characters').trim().isLength({min:3}).escape(),
            (req,res,next)=>{
                console.log('boddyyyyy')
                const errors=validationResult(req)

                let category=new Category({
                    name:req.body.name
                })

                if(!errors.isEmpty()){

                    res.render(`categories_create`,{title:`Add Category`,category:category,errors:errors.array()})
                }
                else{
                    Category.findOne({'name':req.body.name}).exec((err,found_category)=>{
                        if(found_category){
                        res.redirect(`/catalog/categories/${found_category._id}`)}
                        else{
                            category.save((err,saved_category)=>{
                                res.redirect(`/catalog/categories/${saved_category._id}`)
                            })
                        }
                    })
                }
            }
        ]

        exports.categories_update_get=(req,res,next)=>{
            Category.findById(req.params.id,(err,category)=>{
                if(err){return next(err)}
                if(category===null){
                    let err=new Error()
                    err.status=404
                    return next(err)
                }
                res.render('categories_create',{title:'Update Genre',category,errors:[]})
            })
        }


        exports.categories_update_post=[
                
            body('name','Category must contain at least 3 characters').trim().isLength({min:3}).escape(),
            (req,res,next)=>{
                console.log('boddyyyyy')
                const errors=validationResult(req)

                let category=new Category({
                    name:req.body.name,
                    _id:req.params.id
                })

                if(!errors.isEmpty()){

                    res.render(`categories_create`,{title:`Update Category`,category:category,errors:errors.array()})
                }
                else{
                    Category.findOne({'name':req.body.name}).exec((err,found_category)=>{
                        if(found_category){
                        res.redirect(`/catalog/categories/${found_category._id}`)}
                        else{
                            Category.findByIdAndUpdate(req.params.id, category, {}, function (err,thecategory) {
                                if (err) { return next(err); }
                                   // Successful - redirect to genre detail page.
                                   res.redirect(`/catalog/categories/${category._id}`);
                                });
                            
                        }
                    })
                }
            }
        ]

        exports.categories_delete_get=(req,res,next)=>{
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
                
                res.render('categories_delete',{title:`Delete category`,category:results.category,category_games:results.category_games})
    
            })
        }

        exports.categories_delete_post=(req,res,next)=>{
                Category.findByIdAndDelete(req.body.id,err=>{
                    if(err){return next(err)}
                    res.redirect('/catalog/categories')
                })
        }

        