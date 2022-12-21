import Router from "express";
import { AuthHandler } from "../handlers";
import { LogMiddleware, middlewareAuth } from "../helpers";
const api = Router();
/**
 * This method provides general REST API routes
 * */
export default () => {
	api.get("/", (req: Router.Request, res: Router.Response) => {
		try {
			res.status(200).send(true);
		} catch (error) {
			res.status(500).send(false);
		}
	});

	api.get("/auth", [middlewareAuth, LogMiddleware], async (req: Router.Request, res: Router.Response) => {
		try {
			const response = await new AuthHandler().get(req.params.token);
			res.status(200).send(response);
		} catch (error) {
			res.status(500).send();
		}
	});

	api.post("/auth", [middlewareAuth, LogMiddleware], async (req: Router.Request, res: Router.Response) => {
		try {
			const response = await new AuthHandler().post(req.body);
			res.status(200).send(response);
		} catch (error) {
			res.status(500).send();
		}
	});

	return api;
};
