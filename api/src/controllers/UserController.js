const User = require('../models/User')
const Product = require('../models/Product')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    } catch (err) {
        return err
    }
}

module.exports = {
    async get(req, res) {
        try {
            const users = await User.find({})
            res.status(200).send(users)
        } catch (err) {
            res.status(400).send(err)
        }

    },

    async create(req, res) {
        const { name, whatsapp, email, password, latitude, longitude } = req.body

        const location = {
            type: 'Point',
            coordinates: [ longitude, latitude ]
        }

        try {
            const userAlreadyExists = await User.findOne({ email })
            if (userAlreadyExists) return res.status(400).send({ message: 'User already exists' })

            const hashedPassword = await hashPassword(password)

            const createdUser = await User.create({
                name,
                whatsapp,
                email,
                password: hashedPassword,
                location
            })

            return res.status(201).send(createdUser)
        } catch (err) {
            res.status(400).send(err)
        }
    },

    async delete(req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if (user_id !== auth) return res.status(400).send({ message: 'Unaunthorized' })

        try {
            const deletedUser = await User.findByIdAndDelete(user_id)
            const deletedProducts = await Product.deleteMany({ user: { _id: user_id } })
            res.status(200).send({ status: 'deleted', user: deletedUser, products: deletedProducts })
        } catch (err) {
            res.status(400).send(err)
        }
    }
}