const isAuthorized = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next()
        } else {
            return res.status(403).json({
                status: 'failed',
                message: 'Forbidden: only admin can access this resources'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = isAuthorized