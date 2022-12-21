"use strict";
import "reflect-metadata";
require("dotenv").config();

import express from "express";
import methodOverride from "method-override";
import * as path from "path";
import api from "../../router";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({
	extended: true,
}));

app.use("/api", api());

app.use(methodOverride());

export default app;
