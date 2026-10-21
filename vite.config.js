//Importando configurador de Vite
import {defineConfig} from 'vite';
//Importando un admin de rutas 
import {resolve} from 'node:path';
// importando tailwind - no la uso por que no se esta declarando
//import tailwind from '@tailwindcss/vite'
//Imports para crear dirname
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

//Creando las variables de ruta 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    //Directorio raíz de los archivos fuente del frontend
    root: 'src',
    //agentando a vite el plugin de tailwindcss
    plugins: [tailwindcss()],
    //Configurando un servidor de desarrollo 
    server: {
        //Puerto de escucha
        port: 5173,
        cors: true, // Habilita CORS para permitir solicitudes desde Express
        //Rigidez del puerto
        strict: true,
    },
    //Configurando el Build 
    build:{
        //Directorio de salida del js para producción
        outDir: '../dist',
        //Asegurando limpieza del folder de producción 
        emptyOutDir: true,
        //Generar manifiesto para el servidor
        manifest: true,
        //Opciones de Empaquetado
        rollupOptions: {
            input:{
                main: resolve(__dirname, 'src/main.js')
            }
        }
    }

})