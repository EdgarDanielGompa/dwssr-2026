// Funcion para manejar errores en la aplicacion
import createError from 'http-errors';
// Importa el framework express
import express from 'express';
// Importa modulos para manejar rutas (path)

import { fileURLToPath } from 'node:url';
// eslint-disable-next-line
import path, { dirname } from 'node:path';

//importando el template engine handlebars
import hbs from 'hbs';

//importando el registrador del helper

// Para cookies
import cookieParser from 'cookie-parser';
// Registro para saber que pasa en el servidor (Morgan)
import morgan from 'morgan';
//importaando debug
import createDebug from 'debug';

// Se importan las rutas de la aplicacion
 
import indexRouter from '#routes/index.js';
// eslint-disable-next-line import-x/no-rename-default
import usersRouter from '#routes/users.js';
import { registerViteHelper } from './lib/vite.js';
//importando wiston
import logger from './lib/winston.js';

// Recreación de __dirname para ES Modules
const debug = createDebug('dwssr-2026:server');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea la aplicacion de express
debug('🔨creado back end');
const app = express();

// Configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
registerViteHelper(hbs);

// Configurar middlewares de la aplicacion
app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//archivos estaticos para producion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Configuracion de archivos estaticos
debug('🔨Configuración de archivos estáticos');
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registramos las rutas
debug('🔨 Registramos las rutas');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler

app.use((err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
//ejemplo de codigo inlcanzable
//(()=>{
//let age=10

//if (age< 10) {
//console.log("age is less than 10")
//}
//return age
//})()

//module.exports = app;
export default app;