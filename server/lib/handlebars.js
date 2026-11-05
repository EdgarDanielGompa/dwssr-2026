import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { create as createHbsEngine } from 'express-handlebars';

import { registerViteHelper } from './vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname (__filename);

//exportar la funcion de configuracion
export default function configureHandlebars(app) {
  //estableciendo la extencion de los archivos donde las vistas .hbs
  //estableciendo el layout principal en el main
  const exphbs = createHbsEngine({
    extname: '.hbs',
    defaultLayout: 'main',
  });

  //registrando el helper de vite
  registerViteHelper(exphbs.handlebars);
  //registrando handlbars en la app de express
  //registro de engine y su nombre
  app.engine('hbs', exphbs.engine);
  //registrando el engine previamente registrado
  app.set('view engine', 'hbs');
  //estableciendo el directorio de vistas
  app.set('views', path.join(__dirname, '..', 'views'));
}