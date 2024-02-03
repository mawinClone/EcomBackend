const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        
        // CheckUser from db if found -> err 
        const { name, password } = req.body
        var user = await User.findOne({ name })
        if (user) {
            return res.send('this user already exists please use another username').status(400)
        }
        // Encrypt by gen salt 10 digit for combine with password 
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            password
        })
        user.password = await bcrypt.hash(password, salt) 
        // save to db users collection
        await user.save()
        res.send('Register Success!!')

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.login = async (req, res) => {
    try {
        // CheckUser from db find match user
        const { name, password } = req.body
        var user = await User.findOneAndUpdate({ name }, { new: true })
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('Password Invalid!!!')
            }
            // Payload
            var payload = {
                user: {
                    name: user.name
                    // id: user._id
                }
            }
            // Generate
            jwt.sign(payload, 'jwtsecret', { expiresIn: "1D" }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })
        } else {
            return res.status(400).send('User not found!!!')
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}