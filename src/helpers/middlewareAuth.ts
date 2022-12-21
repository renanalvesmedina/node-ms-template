import { AuthenticationError } from "apollo-server-express";
import Router from "express";
import { MiddlewareFn } from "type-graphql";
import { AuthHandler } from "../handlers";
/**
 * This method provides a REST API Middleware to Auth each operation on Rest
 * */
export const middlewareAuth = async (req: Router.Request, res: Router.Response, next: Router.NextFunction) => {

	if (res.locals.currentUser) { next(); }

	const { 1: token } = req.headers.authorization?.split(" ") || [];

	if (!token) { res.status(401).send("Authentication Error"); }

	res.locals.currentUser = await new AuthHandler().get(token);

	next();
};

/**
 * This method provides a REST API Middleware to Auth each operation on Graphql
 * */
export const userMiddleware: MiddlewareFn<any> = async ({ context, info }, next) => {
	if (!context.currentUser) { throw new AuthenticationError("Authentication Error"); }

	return next();
};
