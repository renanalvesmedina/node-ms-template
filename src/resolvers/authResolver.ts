import {  Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import {AuthHandler} from "../handlers";
import { LogAccess, userMiddleware } from "../helpers";
import { AuthData, AuthInput, Context } from "../types";

@Resolver()
export class AuthResolver {

  	/**
	 * @ignore
	 * */
	// tslint:disable-next-line: no-empty
	constructor () {}

/**
 * This method provides a REST API to retrieve a Authentication data
 * */
  @Query(() => AuthData)
  @UseMiddleware(userMiddleware, LogAccess)
  public async get_auth (@Arg("token") token: string, @Ctx() ctx: Context): Promise<AuthData> {
	const auth = new AuthHandler();

	return auth.get(token);
  }

/**
 * This method provides a REST API to create a Authentication data
 * */
  @Mutation(() => AuthData)
  @UseMiddleware(userMiddleware, LogAccess)
  public async create_auth (@Arg("body", (type) => AuthInput) body: AuthInput, @Ctx() ctx: Context): Promise<AuthData> {
	const auth = new AuthHandler();

	return auth.post(body);
  }
}
