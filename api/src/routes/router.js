const { Router } = require('express')

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')
const ProductController = require('../controllers/ProductController')

const routes = Router()

routes.get('/user', UserController.get)
routes.post('/user', UserController.create)
routes.delete('/user/:user_id', UserController.delete)

routes.get('/product', ProductController.indexAll)
routes.get('/product/:user_id', ProductController.indexByUser)
routes.post('/:user_id/product', ProductController.create)
routes.delete('/:user_id/product/:product_id', ProductController.delete)

routes.post('/session', SessionController.verify)

module.exports = routes