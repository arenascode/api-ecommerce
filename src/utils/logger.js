import winston from "winston"
import { NODE_ENV } from "../config/env.config.js";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'brightRed',
    error: 'brightRed',
    warning: 'brightYellow',
    info: 'brightBlue',
    http: 'brightGreen',
    debug: 'rainbow'
  }
}

let transports 

if (NODE_ENV == 'dev') {
  transports = [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({
        colors: customLevelsOptions.colors
        }),
        winston.format.simple())
    }),
  ];
} else {
  transports = [
    new winston.transports.File({
      level: "info",
      filename: 'errors.log',
      format: winston.format.simple()
    }) 
  ]
}


export const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: transports
})

export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.http(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`)
  next()
}