//Importando configurado de vite
import { defineConfig } from 'vite'
//Importando un admoin de rutas
import {resolve} from 'node:path'

//imports para crear Dirname
import { fileURLToPath } from 'node:url';
import {dirname} from 'node:path';

//crendo las variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    //directorio raiz de los archivos fuente del front end
    root: 'src', 
    //configurando un servidor de desarrollo 
    server: {
        port: 5173,
        //Rigidez del puerto
        strict: true
  
    },

    // Configurando el build
    build: {
        //Directorio de salida del java script para produccion
        outDir: "../dist",
        //Asegurando limpieza del folder de produccion
        emptyOutDir: true,
        //Generando manifiesto para el servidor 
        manifest: true,
        //opciones de em paquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js')
            }
            //Configuraciones adicionales de Rollup si es necesario
        }
    },
      //Configuracion para el desarrollo
      publicDir: false
})