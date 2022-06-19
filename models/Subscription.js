const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    profile :{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('subscription', subscriptionSchema)