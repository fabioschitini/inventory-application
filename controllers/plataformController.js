var Game= require('../models/game');
var Category = require('../models/category');
var Plataform = require('../models/plataform');
var async = require('async');
const { body,validationResult } = require("express-validator");


 exports.plataforms_list=(req,res,next)=>{
    Plataform.find().exec((err,plataforms)=>{
    if(err){return next(err)}
    else{res.render(`plataforms_list`,{title:`Plataforms`,plataforms})}
    })}

    exports.plataforms_details=(req,res,next)=>{
      async.parallel({
          plataform_games:callback=>{
              Game.find({'plataform':req.params.id}).populate(`plataform category`).exec(callback)
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

  exports.plataforms_create_get=(req,res,next)=>{
    res.render(`plataforms_create`,{title:`Add Plataform`,plataform:undefined,errors:[]})
    }


    exports.plataforms_create_post=[
                
        body('name','The Plataform must contain at least 3 characters').trim().isLength({min:3}).escape(),
        (req,res,next)=>{
            console.log('boddyyyyy')
            const errors=validationResult(req)

            let plataform=new Plataform({
                name:req.body.name
            })

            if(!errors.isEmpty()){

                res.render(`plataforms_create`,{title:`Add Plataform`,plataform,errors:errors.array()})
            }
            else{
                Category.findOne({'name':req.body.name}).exec((err,found_plataform)=>{
                    if(found_plataform){
                    res.redirect(`/catalog/plataforms/${found_plataform._id}`)}
                    else{
                        plataform.save((err,saved_plataform)=>{
                            res.redirect(`/catalog/plataforms/${saved_plataform._id}`)
                        })
                    }
                })
            }
        }
    ]


    exports.plataforms_update_get=(req,res,next)=>{
        Plataform.findById(req.params.id,(err,plataform)=>{
            if(err){return next(err)}
            if(plataform===null){
                let err=new Error()
                err.status=404
                return next(err)
            }
            res.render('plataforms_create',{title:'Update Plataform',plataform,errors:[]})
        })
    }

    exports.plataforms_update_post=[
                
        body('name','The Plataform must contain at least 3 characters').trim().isLength({min:3}).escape(),
        (req,res,next)=>{
            console.log('boddyyyyy')
            const errors=validationResult(req)

            let plataform=new Plataform({
                name:req.body.name,
                _id:req.params.id
            })

            if(!errors.isEmpty()){

                res.render(`plataforms_create`,{title:`Update Plataform`,plataform,errors:errors.array()})
            }
            else{
                Plataform.findOne({'name':req.body.name}).exec((err,found_plataform)=>{
                    if(found_plataform){
                    res.redirect(`/catalog/plataforms/${found_plataform._id}`)}
                    else{
                        Plataform.findByIdAndUpdate(req.params.id, plataform, {}, function (err,theplataform) {
                            if (err) { return next(err); }
                               // Successful - redirect to genre detail page.
                               res.redirect(`/catalog/plataforms/${plataform._id}`);
                            });
                        
                    }
                })
            }
        }
    ]

    exports.plataforms_delete_get=(req,res,next)=>{
        async.parallel({
            plataform_games:callback=>{
                Game.find({'plataform':req.params.id}).populate(`plataform category`).exec(callback)
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
            
            res.render('plataforms_delete',{title:`Delete plataform`,plataform:results.plataform,plataform_games:results.plataform_games})

        })
    }

    exports.plataforms_delete_post=(req,res,next)=>{
        Plataform.findByIdAndDelete(req.body.id,err=>{
            if(err){return next(err)}
            res.redirect('/catalog/plataforms')
        })
}