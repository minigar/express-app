const { Schema, model } = require('mongoose')
const privatePaths = require('mongoose-private-paths')


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        private: true
    },

    aboutMe: {
        type: String,
        required: false
    },

    books: [{
        type: Schema.Types.ObjectId,
        ref: 'books'
    }],

    karma: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users',
                    required: true
                },

                createDate: {
                    type: Date,
                    default: Date.now
                }
            }
    ],

    createdDate: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(privatePaths)

module.exports = model('users', userSchema)