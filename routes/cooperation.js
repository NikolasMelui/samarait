let express = require('express'),
    router = express.Router();

/* GET about page. */
router.get('/', (req, res, next) => {
  res.render('cooperation', { title: 'Samara IT Community - Cooperation' });
});

module.exports = router;
