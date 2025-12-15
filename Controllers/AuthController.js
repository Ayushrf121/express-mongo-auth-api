// 409 conflict , 500 Internal error 201 created 403 unavailable.
// 



const UserModel = require("../Models/Users");
/*
    bcrypt is a password-hashing library in Node.js that helps you securely store user passwords in your database.
    So instead, bcrypt converts (hashes) the password into a random-looking string that cannot be reversed.
    Without bcrypt	        With bcrypt
    Stores: 123456          Stores: $2b$10$M1bLk04GxHzD8wJxk7nJkeq3y2N7Fqef9/3P8DlOmcL9yTwhT.0Oa
*/
const bcrypt = require("bcrypt");

/*
A JWT (JSON Web Token) is a digitally signed token that securely transmits information (called payload) between two parties — typically:
Server → Client or
Client → Server
It’s most commonly used for authentication.

A JWT has three parts:
Header.Payload.Signature

Payload is created:

{
  "email": "user@example.com",
  "_id": "64f89abcd123"
}


Header is automatically added:

{
  "alg": "HS256",
  "typ": "JWT"
}


Signature is generated using your secret:

HMACSHA256(base64urlEncode(header) + "." + base64urlEncode(payload), JWT_Secret)


The three parts are combined:

header.payload.signature

So now jwtToken might look like:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJfaWQiOiI2NGY4OWFiY2QxMjMifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
*/


const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // it will check the values whether the email is existing in the database or not if it is it will return boolean true otherwise false

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "Data already existed in DB you can login", success: false });
        }
        const usermodel = new UserModel({ name, email, password });
        /*
        10 is the salt rounds — it determines how strong (and slow) the hashing will be.
        bcrypt automatically adds a unique salt for each password (so even if two users have the same password, their hashes will be different).
        */
        usermodel.password = await bcrypt.hash(password, 10);

        await usermodel.save();
        res.status(201).json({ message: "Signup Successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal Error!", success: false })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // since user got the entire data from DB.
        const user = await UserModel.findOne({ email });
        const authMsg = "Authentication failed ! either email or password is wrong!";
        // checks user exist or not!
        if (!user) {
            return res.status(403)
                .json({ message: authMsg, success: false });
        }
        // comparing password done by user and saved password in DB
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(403)
                .json({ message: authMsg, success: false });
        }

        /*sign(payload: string | Buffer | object, secretOrPrivateKey: null, options?: jwt.SignOptions & { algorithm: "none"; }): string */

        // jwt.sign(payload, secretOrPrivateKey, options) : to create a new token
        // payload → The data you want to include inside the token.
        // secretOrPrivateKey → The secret key that signs the token.
        // options → Extra settings.
        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_Secret,
            {expiresIn:"24h"}
        )
        res.status(200)
        .json({
            message:"Login success",
            jwtToken,
            email,
            name : user.name,
            success : true
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Error!", success: false })
    }
}
module.exports = {
    signup, login
}