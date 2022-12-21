import { AuthData, AuthInput } from "../types";

export class AuthHandler {

	/**
	 * @ignore
	 * */
	// tslint:disable-next-line: no-empty
	constructor () {}

	/**
	 * This method provides a retrieve operaration of authenticated user
	 *
	 * @param {string} token String containing token of authentication
	 *
	 * @example
	 * const result = await this.AuthHandler.get("token")
	 *
	 * @returns {AuthData} array of AuthData class
	 * */
	public async get (token: string): Promise<AuthData> {
		return { _id: "123456", email: "test@test.com", password: "123456" };
	}
	/**
	 * This method provides a create operaration of authenticated user
	 *
	 * @param {AuthInput} body Object containing Data of authentication user to be created
	 *
	 * @example
	 * const result = await this.AuthHandler.get({email: email, password: password})
	 *
	 * @returns {AuthData} array of AuthData class
    * */
	public async post (body: AuthInput): Promise<AuthData> {
		return { _id: "123456", email: "test@test.com", password: "123456" };
	}
}
