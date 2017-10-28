let express = require('express'),
    router = express.Router();

/* GET about page. */
router.get('/', (req, res, next) => {
  res.render('events', { title: 'Samara IT Community - Events' });
});

module.exports = router;
