//Funcion para manejar errores de la aplicacion
import createError from 'http-errors';
//Importar el framework express
import express from 'express';
//Importar el modulo cookie-parser para manejar cookies
import cookieParser from 'cookie-parser';
//manejar logs de peticiones HTTP en el servidor
import logger from 'morgan';
//import biblioteca debug para depuracion de errores
import createDebug from 'debug'; //👈
//imports para crear Dirname
import { fileURLToPath } from 'node:url';
//Importar el modulo path para manejar rutas de archivos
import { dirname } from 'node:path';
//importando el template engine de Handlebars
import hbs from 'hbs';

//Se importan las rutas de la aplicacion
//var indexRouter = require('./routes/index');
import indexRouter from '#routes/index.js';
//
//var usersRouter = require('./routes/users');
import usersRouter from '#routes/users.js';
//importando el registrador del helper
import { registerViteHelper } from './lib/vite.js';

//creacion del objeto debug
const debug = createDebug('dwssr-2026:server'); //👈
//crendo las variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//se crea la aplicacion express
debug('🔨creando aplicacion express');
const app = express();

// Configurar el motor de vistas con hbs y la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//Registro helper
registerViteHelper(hbs);

// Configurar middlewares para manejar peticiones HTTP
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Archivos estaticos para produccion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Configurar la carpeta de archivos estáticos
debug('🔨creando servidor de archivos estaticos');
app.use(express.static(path.join(__dirname, '..', 'public')));

//Registrar las rutas de la aplicacion
debug('🔨registrando rutas de la aplicacion');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Capturar errores 404 y redirigir al manejador de errores
app.use((req, res, next) => {
  next(createError(404));
});

//Manejamos errores de la aplicacion, mostrando un mensaje de error y el stacktrace en desarrollo
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//Esto es un ejemplo de codigo inalcanzable
//(()=>{
//let age = 10;
//return age
//if (age == 18) {
//console.log ("Codigo")
// }
//})

//module.exports = app;
export default app;
