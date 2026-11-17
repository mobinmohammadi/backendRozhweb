const requestClientControllers = require('../controllers/requestClientControllers')


const router = require('express').Router()


router.post("/add-requset-client" , requestClientControllers.add_request_client)



module.exports = router