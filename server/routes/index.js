import express from 'express';

const router = express.Router();

//var express = require('express');
//var router = express.Router();
let counter = 0;
const numbers = [];

/* GET home page. */
// eslint-disable-next-line
router.get('/', function (req, res, _next) {
  counter+= 1;
  numbers.push(counter);
  res.render('index', {
    title: 'Edgar Daniel Beltran Acuña',
    counter,
    numbers,
  });
});

//module.exports = router;
export default router;
