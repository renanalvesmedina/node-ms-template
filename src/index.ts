"use strict";
import "reflect-metadata";
require("dotenv").config();
import { ServerSingleton } from "./core/server";

// tslint:disable-next-line: no-floating-promises
(async () => {
	await ServerSingleton.getInstance();
})();




