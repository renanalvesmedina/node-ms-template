import { format, transports } from "winston";

const {
  combine, timestamp, printf,
} = format;

/**
 * Log Format property
 * */
const logFormat =
  printf((info: any) => {
	return `${info.timestamp} ${info.level === "warn" ? "warning" : info.level}: ${info.message}`;
  });

/**
 * Log Console method
 * */
export default new transports.Console({
  format: combine(
	format.colorize(),
	timestamp(),
	logFormat,
  ),
  level: "debug",
});
