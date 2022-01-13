#! /usr/bin/env node
//console.log('This script populates some test games,category and plataforms to your database. Specified database as argument - e.g.: populatedb mongodb+srv://schitini:Fabiolindo1@node-projects.zykqj.mongodb.net/node-projects?retryWrites=true&w=majority');

//var userArgs = process.argv.slice(2);



const async = require('async')
const Game = require('./models/game')
const Category = require('./models/category')
const Plataform = require('./models/plataform')
const Studio=require('./models/studio')

var mongoose = require('mongoose');
var mongoDB = `mongodb+srv://schitini:Fabiolindo1@node-projects.zykqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var games  = []
var categorys = []
var plataforms  = []
var studios = []



function gameCreate(name,studio,description,plataform,category,cb){
    let gameDetail={name,studio,description,plataform,category}
const game=new Game(gameDetail)
game.save(function(err){
    if(err){
        cb(err,null)
        return
    }
    console.log(`New Game:`+game)
    games.push(game)
    cb(null, game)
})
}
function categoryCreate(name,cb){
    let categoryDetail={name}
const category=new Category(categoryDetail)
category.save(function(err){
    if(err){
        cb(err,null)
        return
    }
    console.log(`New Game:`+category)
    categorys.push(category)
    cb(null, category)
})
}

function plataformCreate(name,cb){
    let plataformDetail={name}
const plataform=new Plataform(plataformDetail)
plataform.save(function(err){
    if(err){
        cb(err,null)
        return
    }
    console.log(`New Plataform:`+plataform)
    plataforms.push(plataform)
    cb(null, plataform)
})
}

function studioCreate(name,cb){
    let studioDetail={name}
const plataform=new Studio(studioDetail)
plataform.save(function(err){
    if(err){
        cb(err,null)
        return
    }
    console.log(`New Plataform:`+plataform)
    plataforms.push(plataform)
    cb(null, plataform)
})
}

function createCategoryStudio(cb) {
    async.series([
        function(callback) {
          studioCreate('RockStar', callback);
        },
        function(callback) {
            studioCreate('Santa Monica', callback);
        },
        function(callback) {
            studioCreate('Ubisoft', callback);
        },
        function(callback) {
            studioCreate('Obsidian Entertainment',  callback);
        },
        function(callback) {
            studioCreate('Naughty Dog',  callback);
        },
        function(callback) {
            categoryCreate("Fantasy", callback);
        },
        function(callback) {
            categoryCreate("Science Fiction", callback);
        },
        function(callback) {
            categoryCreate("Action", callback);
        },
        function(callback) {
            categoryCreate("Adventure", callback);
        },
        ],
        // optional callback
        cb);
}
function createPlataform(cb) {
    async.series([
        function(callback) {
            plataformCreate('PS4', callback);
        },
        function(callback) {
            plataformCreate('XBOX ONE', callback);
        },
        function(callback) {
            plataformCreate('PC', callback);
        },
        function(callback) {
            plataformCreate('PS3',  callback);
        },
        function(callback) {
            plataformCreate('XBOX 360',  callback);
        },
        ],
        // optional callback
        cb);
}

function createGames(cb) {
    async.parallel([
        function(callback) {
          gameCreate('Grand Theft Auto 5',studios[0], 'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second. ', [categorys[2],categorys[3]],[plataforms[0],plataforms[1],plataforms[2],plataforms[3],plataforms[4]], callback);
        },
        function(callback) {
            gameCreate("Fallout:New Vegas",studios[3], ' Welcome to Vegas. New Vegas.',  [categorys[2],categorys[1]],[plataforms[2],plataforms[3],plataforms[4]], callback);
        },
        function(callback) {
            gameCreate("God of War",studios[1], 'Many years after Kratos defeated the Olympian gods, he now lives with his son Atreus in ancient Scandinavia in the realm of Midgard. After cremating the body of his wife, Faye, and after a short hunting/survival lesson with Atreus, Kratos is confronted by a mysterious stranger with godlike power and invulnerability.',  [categorys[2],categorys[3]],[plataforms[0]], callback);
        },
        
       
        ],
        // optional callback
        cb);
}

async.series([
    createCategoryStudio,
    createPlataform,
    createGames
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+games);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});






