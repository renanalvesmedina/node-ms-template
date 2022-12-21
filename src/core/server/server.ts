"use strict";
require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import * as http from "http";
import { Server } from "http";
import { buildSchema } from "type-graphql";
import { config, log } from "..";
import { AuthHandler } from "../../handlers";
import * as resolvers from "../../resolvers";
import app from "./app";

/**
 * This Class provides a Server Class
 * */
export class ServerClass {
	/**
	 * Eexpress server property
	 * */
	public server: Server;

	/**
	 * Server listening boolean property
	 * */
	public listening: boolean;

	/**
	 * @ignore
	 * */
	// tslint:disable-next-line: no-empty
	constructor () {}

	/**
	 * This method provides an express server start
	 * */
	public async listen (port?: string) {
		const serverPort = port || config.server.port;
		this.server = http.createServer(app);
		const serverApollo = new ApolloServer({
			context: async ({ req }: any) => {
				const { 1: token } = req.headers.authorization?.split(" ") || [];
				const currentUser = await new AuthHandler().get(token);

				return token?.length && currentUser ? { currentUser } : { currentUser: null };
			},
			introspection: true,
			playground: true,
			schema: await buildSchema({
				resolvers: [resolvers.AuthResolver],
			}),
		});

		serverApollo.applyMiddleware({ app, cors: { credentials: true, origin: true } });
		this.server.listen(serverPort);
		this.listening = true;
		log.info(`Server running on ${serverPort}`);
	}

	/**
	 * This method provides an express server stop
	 * */
	public async close () {
		log.info(`Server shutdown on ${config.server.port}`);
		// tslint:disable-next-line: await-promise
		await this.server.close();
		this.listening = false;
	}
}

/**
 * This Class provides a Server Singleton Class to ensure static server
 * */
// tslint:disable-next-line: max-classes-per-file
export class ServerSingleton {
	/**
	 * ServerClass static property
	 * */
	public static server: ServerClass;

	/**
	 * This method provides only one instance of ServerClass
	 * */
	public static async getInstance (port?: string): Promise<ServerClass> {
		if (!this.server?.listening) {
			const serverPort = port || config.server.port;
			this.server = new ServerClass();
			await this.server.listen(serverPort.toString());

			return this.server;
		}

		return this.server;
	}

	/**
	 * @ignore
	 * */
	// tslint:disable-next-line: no-empty
	constructor () {}
}
