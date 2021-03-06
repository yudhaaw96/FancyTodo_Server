module.exports = (err, req, res, next) => {
    console.log(err);

    if (err.name === "SequelizeUniqueConstraintError") {

        res.status(400).json({
            code : 400,
            type : "BAD REQUEST",
            errors : err.message
        })
    }

    if (err.name === "SequelizeValidationError") {

        let errors = err.errors.map(el => ({
            message : el.message
        }))

        res.status(400).json({
            code : 400,
            type : "BAD REQUEST",
            errors
        })
    }

    if (err.name === "JsonWebTokenError") {

        res.status(401).json({
            code : 401,
            type : "UNAUTHORIZED",
            errors : "Please login first!"
        })
    }

    res.status(err.code || 500).json({
        code : err.code || 500,
        type : err.type || "INTERNAL SERVER ERROR",
        errors : err.message || err
    })
}