//Funcion para manejar errores de la aplicacion
//❌var createError = require('http-errors');
import createError from 'http-errors'
//Importar el framework express
//❌var express = require('express');
import express from 'express'
//Importar el modulo path para manejar rutas de archivos
// ❌var path = require('path');
import path from 'node:path'
//Importar el modulo cookie-parser para manejar cookies
//❌var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser'
//manejar logs de peticiones HTTP en el servidor
//❌var logger = require('morgan');
import logger from 'morgan'
//imports para crear Dirname
import { fileURLToPath } from 'node:url';
import {dirname} from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Se importan las rutas de la aplicacion
//var indexRouter = require('./routes/index');
import indexRouter from './routes/index.js'
//var usersRouter = require('./routes/users');
import usersRouter from './routes/users.js'
//se crea la aplicacion express
var app = express();

// Configurar el motor de plantillas y la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configurar middlewares para manejar peticiones HTTP
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '..' ,'public')));
//Registrar las rutas de la aplicacion
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Capturar errores 404 y redirigir al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

//Manejamos errores de la aplicacion, mostrando un mensaje de error y el stacktrace en desarrollo
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
export default app;
