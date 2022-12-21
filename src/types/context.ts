import { Field, ObjectType } from "type-graphql";
import { AuthData } from "./auth";

/**
 * This Class declare Context data, to be used in Context of Operations
 * */
@ObjectType("Context")
export class Context {

	/**
	 * * Current Authenticated User
   	* */
	@Field((type) => AuthData)
	public currentUser: AuthData;

	/**
	 * @ignore
	 * */
	// tslint:disable-next-line: no-empty
	constructor () {}
}
