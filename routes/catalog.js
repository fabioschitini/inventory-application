const express=require(`express`)
const router=express.Router()



var game_controller = require('../controllers/gameController'); 
var category_controller = require('../controllers/categoriesController');
var plataform_controller = require('../controllers/plataformController');



router.get('/',game_controller.index  );

//app.get(`/test`,(req,res)=>{res.render('test')})
//app.post(`/test`,upload.single('image'),async (req,res)=>{await console.log(req.file)})

router.get(`/categories`,category_controller.categories_list)


router.get(`/plataforms`,plataform_controller.plataforms_list)

router.get(`/categories/create`,category_controller.categories_create_get)

router.post(`/categories/create`,category_controller.categories_create_post)

router.get(`/plataforms/create`,plataform_controller.plataforms_create_get)

router.post(`/plataforms/create`,plataform_controller.plataforms_create_post)

router.get(`/games/create`,game_controller.games_create_get)

router.post(`/games/create`,game_controller.games_create_post)

router.get(`/games`,game_controller.games_list)

router.get(`/games/update/:id`,game_controller.games_update_get)

router.post(`/games/update/:id`,game_controller.games_update_post)

router.get(`/games/delete/:id`,game_controller.games_delete_get)
router.post(`/games/delete/:id`,game_controller.games_delete_post)


router.get(`/games/:id`,game_controller.games_details)

router.get(`/categories/update/:id`,category_controller.categories_update_get)

router.post(`/categories/update/:id`,category_controller.categories_update_post)

router.get(`/categories/delete/:id`,category_controller.categories_delete_get)

router.post(`/categories/delete/:id`,category_controller.categories_delete_post)

router.get(`/categories/:id`,category_controller.categories_details)

router.get(`/plataforms/:id`,plataform_controller.plataforms_details)

router.get(`/plataforms/update/:id`,plataform_controller.plataforms_update_get)

router.post(`/plataforms/update/:id`,plataform_controller.plataforms_update_post)

router.get(`/plataforms/delete/:id`,plataform_controller.plataforms_delete_get)

router.post(`/plataforms/delete/:id`,plataform_controller.plataforms_delete_post)







module.exports = router;   



