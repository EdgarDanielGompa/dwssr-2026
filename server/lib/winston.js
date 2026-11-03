//importando el core de winston
import winston, {format} from 'winston';
//importando bibliotecas de node
import path from 'node:path';

import fs from 'node:fs';
//importando el plug-in de winston
import DailyRotateFile from 'winston-daily-rotate-file';


//desestructura funciones utiles de format
const {combine, timestamp, label, printf, colorize,
  prettyPrint } = format;

  //creando variable del directorio raiz
  const rootdir = path.resolve(process.cwd());

  //creando directorios de logs
  const logDir = path.join(rootdir, 'logs');
  if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
   
//Definiendo esquema de colores
const colors = {  
error: 'red',
warn: 'yellow',
info: 'green',
http: 'magenta',
debug:  'blue',
}

//Agregando ese esquema a winston
winston.addColors(colors);

//Creando plantillas para los formatos

//Formato de consola
const myConsoleFormat = combine(
  //Colores de formato
  colorize({all: true}),
//Agregando una etiqueta
label({label: '📢: '}),
//agregando fecha
timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
//funcion de impresion
printf((info)=> `${info.level} ${info.label} ${info.timestamp} ${info.mensaje}`,
),
);

//archivos json
const myFileFormat = combine(
  //retirar colorizacion
  format.uncolorize(),
  //agregar fecha
  timestamp(),
  //salida
  format.json(),
);

//Construyendo y configurando transportes
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(rootdir, 'logs', 'error.log'),
    maxsize: 5242880, //5MB
    maxFiles: 2,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
  readableFile: {
    level: 'info',
    filename: path.join(logDir, 'readable.log'),
    maxsize: 5242880, //5MB
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint(),
    ),
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logDir, 'logs', 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zipperArchive: true,
    maxsize: 5242880, //5MB
    maxFiles: 2,
    format: myFileFormat,
  },
};

//creando el logger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transport.File(options.redableFile),
    new winston.transport.File(options.errorFile),
  ],
  exeptionHandlers: [
    new winston.transport.File({
      filename: path.join(logDir, 'exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transport.File({
      filename: path.join(logDir, 'rejection.log'),
    }),
  ],
  exitOnError: false,
});

//exportamos logger
export default logger;