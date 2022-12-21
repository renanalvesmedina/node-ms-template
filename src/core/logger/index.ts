import { createLogger, format } from "winston";
import config from "../config";
import consoleLog from "./console";
import fileLog from "./file";

const { combine, timestamp, json } = format;


/**
 * Logger Creation Method
 * */
const logger = createLogger({
	defaultMeta: { service: config.log.service },
	exitOnError: false, // do not exit on handled exceptions
	format: combine(
		timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		json(),
	),
	level: "info",
	transports: [
		...fileLog,
	],
});

if (config.nodeEnv !== "production") {
	logger.add(consoleLog);
}

/**
 * Provides Logger Operations
 * */
export default logger;
