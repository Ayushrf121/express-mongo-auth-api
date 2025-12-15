
const router = require("express").Router();
const ensureAuthenticated = require("../Middlewares/JWTAuth")
router.get('/',ensureAuthenticated,(req,res)=>{
    
    res.status(200).json(
        [
            {
               name : "Apple Store",
               price : "$89 Billon" 
            },
            {
               name : "Samsung Store",
               price : "$85 Billon"
            },
            {
                user : req.user
            }
        ]
    )
    
})
module.exports = router;