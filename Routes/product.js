const express = require('express')
const router = express.Router()

const {
    read,
    list,
    create,
    update,
    remove
} = require('../Controllers/product')

const { auth } = require('../Middleware/auth')



//http://localhost:5000/api/product
// router.get('/product', auth, list)
// router.get('/product/:id', auth, read)
// router.post('/product', auth, create)
// router.put('/product/:id', auth, update)
// router.delete('/product/:id', auth, remove)



router.get('/product', list)
router.get('/product/:id', read)
router.post('/product', create)
router.put('/product/:id', update)
router.delete('/product/:id', remove)




module.exports = router