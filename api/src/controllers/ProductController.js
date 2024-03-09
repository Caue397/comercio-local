const Product = require('../models/Product')
const User = require('../models/User')

module.exports = {
    async create (req, res) {
        const { name, price } = req.body
        const { user_id } = req.params
        const { auth } = req.headers

        if (user_id !== auth) return res.status(400).send({ message: 'Unaunthorized' })

        try {
            const userInfo = await User.findById(user_id)

            const { location } = userInfo
            const longitude = location.coordinates[0]
            const latitude = location.coordinates[1]
            const setLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const createdProduct = await Product.create({
                name,
                price,
                user: user_id,
                location: setLocation
            })
            await createdProduct.populate('user')

            return res.status(201).send(createdProduct)
        } catch (err) {
            return res.status(400).send(err)
        }
    },
    async delete (req, res) {
        const { product_id, user_id } = req.params
        const { auth } = req.headers

        if (user_id !== auth) return res.status(400).send({ message: 'Unaunthorized' })
        
        try {
            const deletedProduct = await Product.findByIdAndDelete(product_id)

            return res.status(200).send({ status: 'deleted', product: deletedProduct })
        } catch (err) {
            return res.status(400).send(err)
        }
    },
    async indexByUser (req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if (user_id !== auth) return res.status(400).send({ message: 'Unaunthorized' })

        try {
            const userProducts = await Product.find({
                user: user_id
            })

            return res.status(200).send(userProducts)
        } catch (err) {
            return res.status(400).send(err)
        }
    },
    async indexAll (req, res) {
        const { longitude, latitude } = req.query

        const maxDistance = 20000

        try {
            const products = await Product.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: maxDistance
                    }
                }
            }).populate('user').limit(24)

            return res.status(200).send(products)
        } catch (err) {
            return res.status(400).send(err)
        }
    }
}