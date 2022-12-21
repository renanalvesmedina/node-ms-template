import "reflect-metadata";
import { default as request } from "supertest";
import { ServerClass, ServerSingleton } from "../core/server";
import app from "../core/server/app";
import { AuthData, AuthInput  } from "../types";
// tslint:disable-next-line: ordered-imports
import { AuthenticationError } from "apollo-server-express";

const authPostBody: { body: AuthInput } = { body: { email: "test@test.com", password: "123456" } };
const authRespone: AuthData = { _id: expect.any(String), email: expect.any(String), password: expect.any(String) };
const authGetToken: { token: string } = { token: "123456" };

const AuthQueryData = {
	query: `query get_auth($token: String!) {
        get_auth(token: $token) {
            _id
            email
            password
        }
    }`,
	variables: authGetToken,
};

const AuthMutationData = {
	query: `mutation create_auth($body: AuthInput!) {
        create_auth(body: $body) {
            _id
            email
            password
        }
    }`,
	variables: authPostBody,
};


let server: any;
let serverInstance: ServerClass;

beforeAll(async () => {
	serverInstance = await ServerSingleton.getInstance("3032");
	server = serverInstance.server;
});

afterAll(async () => {
	await serverInstance?.close();
});

describe("GET /Auth - ", () => {
	it("Auth API Request", async () => {
		const result = await request(app).post("/graphql").set("Authorization", "Bearer 123456").send(AuthQueryData);
		expect(result.status).toEqual(200);
		expect(result.body.data.get_auth).toMatchObject(authRespone);
	});

	it("Auth API Request to get authentication error", async () => {
		const result = await request(app).post("/graphql").send(AuthQueryData);
		expect(result.status).toEqual(200);
		expect(JSON.parse(result.text).errors).toBeDefined();
		expect(result.body.data).toBeNull();
	});
});

describe("POST /Auth - ", () => {
	it("Auth API Request", async () => {
		const result = await request(app).post("/graphql").set("Authorization", "Bearer 123456").send(AuthMutationData);
		expect(result.status).toEqual(200);
		expect(result.body.data.create_auth).toMatchObject(authRespone);
	});

	it("Auth API Request to get authentication error", async () => {
		const result = await request(app).post("/graphql").send(AuthMutationData);
		expect(result.status).toEqual(200);
		expect(JSON.parse(result.text).errors).toBeDefined();
		expect(result.body.data).toBeNull();
	});
});
