//importando el core de winston
import winston, { format } from 'winston';
//impportando
import path from 'node:path';

import fs from 'node:fs';
//importando winston
import DailyRotateFile from 'winston-daily-rotate-file';

//desectuctura funciones utiles de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

//creando variable de directorio raiz
const rootdir = path.resolve(process.cwd());

//creando directorio de logd
const logsDir = path.join(rootdir, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

//definindo esquema de coloree
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

//agregando ese esquema a winsron
winston.addColors(colors);

//creacion de plantillas para los formsatos

// Formato de consola
const myConsoleFormat = combine(
  // Colores del formato
  colorize({ all: true }),

  // Agregando etiqueta al log
  label({ label: '📢: ' }),

  // Registro de fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),

  // Función de impresión
  printf(
    (info) =>
      `${info.level} ${info.label} ${info.timestamp} ${info.message}`,
  ),
);

//archivos json
const myFileFormat = combine(
  //retirar colorizacion
  format.uncolorize(),
  //sgergar fecha i50
  timestamp(),
  //salida
  format.json(),
);

//CONTRULLENDO Y CONFI TRANSPORTES
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(logsDir, 'logs', 'error.log'),
    maxsize: 5242880, //5mb
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
    filename: path.join(logsDir, 'logs', 'readable.log'),
    maxsize: 5242880, //5mb
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint(),
    ),
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logsDir, 'logs', 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxsize: 5242880, //5mb
    maxFiles: 2,
    format: myFileFormat,
  },
};

//creando looger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transports.File(options.readableFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exception.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejection.log'),
    }),
  ],
  exitOnError: false,
});

//exportmaos looger
export default logger;