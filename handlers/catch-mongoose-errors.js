const MongooseError = require('mongoose').Error;

module.exports = async(req, res, next) => {
    try {
        await next();
    }

        catch (err) {
        if (err instanceof MongooseError) {
            res.status(400).json("Bad request!");
        }
        else{
            res.json(err);
        }
    }
}