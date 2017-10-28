let express = require('express'),
    router = express.Router();

/* GET about page. */
router.get('/', (req, res, next) => {
  res.render('reports', { title: 'Samara IT Community - Reports' });
});

module.exports = router;
