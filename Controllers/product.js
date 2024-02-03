const Product = require('../Models/Product')

// read product by id
exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const producted = await Product.findOne({ _id: id }).exec();
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

// read all produce
exports.list = async (req, res) => {
    try {
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

// create new product
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const producted = await Product(req.body).save()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

// find and update product by id
exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const updated = await Product
            .findOneAndUpdate({ _id: id }, req.body, { new: true })
            .exec()
        res.send(updated)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

// remove product by id
exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id:id}).exec()
        res.send(removed)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}