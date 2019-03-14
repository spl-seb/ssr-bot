const router = require('express').Router();


router.get("/specific", (req, res, next) => {
    res.render("humain_specific")
})

router.get("/", (req, res, next) => {
    res.render("humain_index")
})

router.get("/*", (req, res, next) => {
    res.redirect("/");
})
module.exports = router;