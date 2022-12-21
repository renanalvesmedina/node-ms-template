const {
	NODE_ENV,
	API_URL,
	PORT,
	LOG_APP_PATH,
	TIME_EXCEEDED_MINUTES,
	LOG_SERVICE_NAME,
	TEMP_FOLDER,
} = process.env;

export default {
	log: {
		path: LOG_APP_PATH || "./app/log",
		service: LOG_SERVICE_NAME || "bff-api",
	},
	nodeEnv: NODE_ENV || "development",
	server: {
		port: PORT || 8080,
		timeExceededMinutes: TIME_EXCEEDED_MINUTES ? Number(TIME_EXCEEDED_MINUTES) : 10,
		url: API_URL,
	},
	temp: {
		path: TEMP_FOLDER,
	},
};
