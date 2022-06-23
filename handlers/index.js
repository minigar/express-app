const errors = require('./errors');
const catchMongooseErrors = require('./catch-mongoose-errors');

module.exports = [
    errors,
    catchMongooseErrors,
]