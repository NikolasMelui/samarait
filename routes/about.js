let express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('about', { title: 'Samara IT Community - About' });
});

module.exports = router;
