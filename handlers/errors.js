module.exports = async (req, res, next) => {
    try {
        await next()
    } catch(e) {
        res.status = e.status || 500
        res.json({ error: e.message || 'Internal Server Error' })
    }
}