var Game= require('../models/game');
var Category = require('../models/category');
var Plataform = require('../models/plataform');


exports.index=(req,res)=>{
    Game.find().populate(`plataform category`).exec((err,games)=>{
        console.log(games)
        if(err) {return next(err)}
        else{res.render(`index`,{title:`Home`,games})}
    })}

exports.games_list=(req,res)=>{
Game.find().populate(`plataform category`).exec((err,games)=>{
if(err){return next(err)}
else{res.render(`games_list`,{title:`Games`,games})}
})}

exports.games_details=(req,res)=>{
    Game.findById(req.params.id).populate(`plataform category`).exec((err,game)=>{
    if(err){return next(err)}
    else{res.render(`games_details`,{title:`Game details`,game})}
    })}

    



