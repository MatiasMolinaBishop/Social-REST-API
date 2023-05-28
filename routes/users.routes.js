const router = require('express').Router()

router.get("/", (req, res, next) => {


})

router.get("/users", (req, res, next) => {
    res.send("HELLO ALL USERS");
});

module.exports = router;