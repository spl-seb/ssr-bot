const router = require('express').Router();

router.get("/", (req, res, next) => {
    res.render("robot_index")
})

router.get("/specific", (req, res, next) => {
    res.render("robot_specific")
})

router.get("/*", (req, res, next) => {
    res.redirect("/");
})
module.exports = router;