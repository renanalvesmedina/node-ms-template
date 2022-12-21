import Router from "express";
import { MiddlewareFn } from "type-graphql";
import log from "../core/logger";

/**
 * This method provides a REST API Middleware to log each operation on Graphql
 * */
export const LogAccess: MiddlewareFn<any> = async ({ context, info, args }, next) => {
	log.info(`User with email ${context.currentUser.email} accessed ${info.operation.operation} ${info.path.key} with ${JSON.stringify(args)}`);

	return next();
};

/**
 * This method provides a REST API Middleware to log each operation on Rest
 * */
export const LogMiddleware = (req: Router.Request, res: Router.Response, next: Router.NextFunction) => {
	log.info(`User with email ${res.locals.currentUser.email} accessed ${req.method} ${req.path} with ${JSON.stringify(req.body)}`);

	next();
};
