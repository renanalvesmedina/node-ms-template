import "reflect-metadata";
import { default as request } from "supertest";
import app from "../core/server/app";
import { AuthData, AuthInput } from "../types";

const authPostBody: { body: AuthInput } = { body: { email: "test@test.com", password: "123456" } };
const authRespone: AuthData = { _id: expect.any(String), email: expect.any(String), password: expect.any(String) };
const authGetToken: { token: string } = { token: "123456" };

describe("GET / - a simple api endpoint", () => {
	it("health API Request", async () => {
		const result = await request(app).get("/api/");
		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.text)).toEqual(true);
	});
});

describe("GET /Auth - ", () => {
	it("Auth API Request", async () => {
		const result = await request(app).get("/api/auth").set("Authorization", "Bearer 123456").query(authGetToken);
		expect(result.status).toEqual(200);
		expect(result.body).toMatchObject(authRespone);
	});

	it("Auth API Request to get authentication error", async () => {
		const result = await request(app).get("/api/auth").query(authGetToken);
		expect(result.status).toEqual(401);
	});

	it("Auth API Request to get authentication error", async () => {
		const result = await request(app).get("/api/auth");
		expect(result.status).toEqual(401);
	});
});

describe("POST /Auth - ", () => {
	it("Auth API Request", async () => {
		const result = await request(app).post("/api/auth")
		.set("Authorization", "Bearer 123456").send(authPostBody.body);
		expect(result.status).toEqual(200);
		expect(result.body).toMatchObject(authRespone);
	});

	it("Auth API Request to get authentication error", async () => {
		const result = await request(app).post("/api/auth").query(authPostBody.body);
		expect(result.status).toEqual(401);
	});
});
