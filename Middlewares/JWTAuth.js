
const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
    //    if authorization header is empty then it will simply give the boolean false.
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).json({
            message: "unauthorized JWT token required"
        })
    }
    try {
        // decoding the JWT token......
        const verify = jwt.verify(auth, process.env.JWT_Secret);
        /*req (the request object) in Express is a normal JavaScript object that represents the HTTP request.
        You can add your own custom properties to it at any time.
        So when we do:
        req.user = decoded;
        We’re creating a new property called user on the req object dynamically.
        It didn’t exist before, but now it does. */

        req.user = verify;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "unauthorized JWT token wrong or expired!"
        })
    }
}

module.exports = ensureAuthenticated;