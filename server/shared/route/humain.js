const router = require('express').Router();

router.get("/", (req, res, next) => {
    res.render("humain_index")
})

router.get("/specific", (req, res, next) => {
    res.render("humain_specific")
})

module.exports = router;