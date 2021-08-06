/**
 это безполезный роутер, его можно не смотреть
*/

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { username } = req.query;
  res.render('index', { username });
});

router.get('/allusers', (req, res) => {
  res.json({ admin: true });
});

router.get('/test/:param', (req, res) => {
  res.render('index', { username: req.params.param });
});

module.exports = router;
