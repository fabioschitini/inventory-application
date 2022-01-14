const express=require(`express`)
const router=express.Router()

var game_controller = require('../controllers/gameController'); 
var category_controller = require('../controllers/categoriesController');
var plataform_controller = require('../controllers/plataformController');

router.get('/',game_controller.index  );

router.get(`/games`,game_controller.games_list)

router.get(`/categories`,category_controller.categories_list)

router.get(`/plataforms`,plataform_controller.plataforms_list)

router.get(`/categories/create`,category_controller.categories_create)

router.get(`/plataforms/create`,plataform_controller.plataforms_create)

router.get(`/games/create`,game_controller.games_create_get)

router.post(`/games/create`,game_controller.games_create_post)


router.get(`/games/:id`,game_controller.games_details)

router.get(`/categories/:id`,category_controller.categories_details)

router.get(`/plataforms/:id`,plataform_controller.plataforms_details)




module.exports = router;   



