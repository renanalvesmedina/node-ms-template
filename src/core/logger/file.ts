// tslint:disable-next-line: no-require-imports
import DailyRotateFile = require("winston-daily-rotate-file");
import config from "../config";

const options = {
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  maxSize: "50m",
  zippedArchive: false,
};

const { path, service } = config.log;

/**
 * Log File method
 * */
export default [
  new DailyRotateFile({
	...options,
	filename: `${path}/${service}-error-%DATE%.log`,
	level: "error",
  }),
  new DailyRotateFile({
	...options,
	filename: `${path}/${service}-%DATE%.log`,
  }),
];
