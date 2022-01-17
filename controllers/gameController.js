var Game= require('../models/game');
var Category = require('../models/category');
var Plataform = require('../models/plataform');
const asyncs=require('async')
const { body,validationResult } = require("express-validator");
const multer=require('multer')

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, '../public/images');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });



exports.index=(req,res,next)=>{
    Game.find().populate(`plataform category`).exec((err,games)=>{
        if(err) {return next(err)}
        else{res.render(`index`,{title:`Home`,games})}
    })}

exports.games_list=(req,res,next)=>{
Game.find().populate(`plataform category`).exec((err,games)=>{
if(err){return next(err)}
else{res.render(`games_list`,{title:`Games`,games})}
})}

exports.games_details=(req,res,next)=>{
    Game.findById(req.params.id).populate(`plataform category`).exec((err,game)=>{
    if(err){return next(err)}
    else{res.render(`games_details`,{title:`Game details`,game})}
    })}

exports.games_create_get=(req,res,next)=>{
    asyncs.parallel({
        categories:callback=>{
            Category.find().exec(callback)
        },
    
        plataforms:callback=>{
            Plataform.find().exec(callback)
        },
    },
    
        function (err,results){ 
            if(err){return next(err)}
    res.render(`games_create`,{title:`Add Game`,categories:results.categories,plataforms:results.plataforms,game:undefined,errors:[]})
        })
    }

    exports.games_create_post=[
        
        (req,res,next)=>{
            if(!(req.body.category instanceof Array)){
                if(typeof req.body.category==='undefined')
                req.body.category=[]
                else
                req.body.category=new Array(req.body.category)
            }
            if(!(req.body.plataform instanceof Array)){
                if(typeof req.body.plataform==='undefined')
                req.body.plataform=[]
                else
                req.body.plataform=new Array(req.body.plataform)
            }
                next()
    },
    body('name',`Name must not be empty`).trim().isLength({min:1}).escape(),
    body('description',`Description must not be empty`).trim().isLength({min:3}).escape(),
    body('amount',`Amount must not be empty`).trim().isInt().isFloat({min:1}).isLength({min:1}).escape(),
    body('studio',`studio must not be empty`).trim().isLength({min:3}).escape(),
    body('category.*').escape(),
    body('plataform.*').escape(),

    

function (req, res, next){
   

const errors=validationResult(req)

let game=new Game({
name:req.body.name,
description:req.body.description,
amount:req.body.amount,
studio:req.body.studio,
category:req.body.category,
plataform:req.body.plataform
})

if(!errors.isEmpty()){

asyncs.parallel({

    categories:callback=>{
        Category.find().exec(callback)
    },

    plataforms:callback=>{
        Plataform.find().exec(callback)
    },
},

    function (err,results){ 
        if(err){return next(err)}
        for (let i=0;i<results.categories.length;i++){
            if(game.category.indexOf(results.categories[i]._id)>-1){
                results.categories[i].checked=true
            }
        }
        for (let i=0;i<results.plataforms.length;i++){
            if(game.plataform.indexOf(results.plataforms[i]._id)>-1){
                results.plataforms[i].checked=true
            }
        }

res.render(`games_create`,{title:`Add Game`,categories:results.categories,plataforms:results.plataforms,game,errors:errors.array()})
    })
}//
else{
game.save(err=>{
    if(err){return next(err)}
    res.redirect(`/catalog/games/${game._id}`)
})
}

},

]

exports.games_update_get=(req,res,next)=>{
    asyncs.parallel({
        game: function(callback) {
            Game.findById(req.params.id).populate(`plataform category`).exec(callback);
        },
        categories:callback=>{
            Category.find().exec(callback)
        },
    
        plataforms:callback=>{
            Plataform.find().exec(callback)
        },
    },
    
        function (err,results){ 
            if(err){return next(err)}
            if (results.game==null) { // No results.
                var err = new Error('Game not found');
                err.status = 404;
                return next(err);
            }
            for(let i=0;i<results.game.category.length;i++){
                for(let a=0;a<results.categories.length;a++){
                    if(results.game.category[i]._id.toString()===results.categories[a]._id.toString()){
                        results.categories[a].checked='true'
                    }
                }
            }

            for(let b=0;b<results.game.plataform.length;b++){
                for(let c=0;c<results.plataforms.length;c++){
                    if(results.game.plataform[b]._id.toString()===results.plataforms[c]._id.toString()){
                        results.plataforms[c].checked='true'
                    }
                }
            }

    res.render(`games_update`,{title:`Update Game`,categories:results.categories,plataforms:results.plataforms,game:results.game,errors:[]})
        })
    }


    exports.games_update_post=[
        (req,res,next)=>{
            if(!(req.body.category instanceof Array)){
                if(typeof req.body.category==='undefined')
                req.body.category=[]
                else
                req.body.category=new Array(req.body.category)
            }
            if(!(req.body.plataform instanceof Array)){
                if(typeof req.body.plataform==='undefined')
                req.body.plataform=[]
                else
                req.body.plataform=new Array(req.body.plataform)
            }
                next()
    },
    body('name',`Name must not be empty`).trim().isLength({min:1}).escape(),
    body('description',`Description must not be empty`).trim().isLength({min:1}).escape(),
    body('amount',`Amount must not be empty`).trim().isInt().isFloat({min:1}).isLength({min:1}).escape(),
    body('studio',`studio must not be empty`).trim().isLength({min:3}).escape(),
    body('category.*').escape(),
    body('plataform.*').escape(),

    (req,res,next)=>{
        console.log(req.body.category)
        console.log(req.body.plataform)

const errors=validationResult(req)

let game=new Game({
    name:req.body.name,
    description:req.body.description,
    amount:req.body.amount,
    studio:req.body.studio,
    category:(typeof req.body.category===undefined )?[]:req.body.category,
    plataform:(typeof req.body.plataform===undefined )?[]:req.body.plataform,
    _id:req.params.id
})

if(!errors.isEmpty()){

    asyncs.parallel({

        categories:callback=>{
            Category.find().exec(callback)
        },
    
        plataforms:callback=>{
            Plataform.find().exec(callback)
        },
    },
    
        function (err,results){ 
            if(err){return next(err)}
            for (let i=0;i<results.categories.length;i++){
                if(game.category.indexOf(results.categories[i]._id)>-1){
                    results.categories[i].checked=true
                }
            }
            for (let i=0;i<results.plataforms.length;i++){
                if(game.plataform.indexOf(results.plataforms[i]._id)>-1){
                    results.plataforms[i].checked=true
                }
            }
            console.log(`yeeeeeeeeeeeeeeeeeeet`)
    res.render(`games_update`,{title:`Add Game`,categories:results.categories,plataforms:results.plataforms,game,errors:errors.array()})
        })
}//
else{
    console.log(`should have updated`)
    console.log(game)
    Game.findByIdAndUpdate(req.params.id,game,{},function(err,thegame){
        if(err){return next(err)}
        res.redirect(`/catalog/games/${game._id}`)
    })
}

    },

]

exports.games_delete_get=(req,res,next)=>{
    Game.findById(req.params.id).populate(`plataform category`).exec((err,game)=>{
    if(err){return next(err)}
    else{res.render(`games_delete`,{title:`Delete Game`,game})}
    })}
        
    exports.games_delete_post=(req,res,next)=>{
        Game.findById(req.body._id).populate(`plataform category`).exec((err,game)=>{
            if(err){return next(err)}
            Game.findByIdAndDelete(req.body.id,err=>{
                if(err){return next(err)}
                res.redirect('/catalog/games')
            })
        })
    }
    



