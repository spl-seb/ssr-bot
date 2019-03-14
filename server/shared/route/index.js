const router = require('express').Router();

router.get("/", (req, res, next) => {
    res.render("index")
})

router.get("/specific", (req, res, next) => {
    res.render("specific")
})

router.get("/*", (req, res, next) => {
    res.redirect("/");
})
module.exports = router;