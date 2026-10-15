import express from 'express'
const router = express.Router();
//var express = require('express');
//var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, _next) {
  res.send('<h1 style="color: red;">LISTA DE AMIGOS</h1>');
});

//module.exports = router;
export default router;
