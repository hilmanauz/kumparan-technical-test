const router = require('express').Router();
const Controller = require("../controllers");

router.get('/articles', Controller.viewArticles);
router.post('/articles', Controller.createArticles);

module.exports = router