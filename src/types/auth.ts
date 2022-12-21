import { Field, ID, InputType, ObjectType } from "type-graphql";
/**
 * This Class declare Auth Data, to be used in Auth Handler
 * */
@ObjectType("AuthData")
export class AuthData {

	/**
	 * * id of User
   	* */
	@Field((type) => ID)
	// tslint:disable-next-line: variable-name
	public _id: String;
	/**
	 * * Email of User
   	* */
	@Field((type) => String, {nullable: true})
	public email: String;
	/**
	 * * password User
   	* */
	@Field((type) => String, {nullable: true})
	public password: String;
	/**
	 * @ignore
	 * */
	// tslint:disable-next-line: no-empty
	constructor () {}

}

/**
 * This Class declare Auth Input, to be used in Auth Handler
 * */
// tslint:disable-next-line: max-classes-per-file
@InputType("AuthInput")
export class AuthInput {

	/**
	 * * Email of User
   	* */
	@Field((type) => String)
	public email: String;
	/**
	 * * password User
   	* */
	@Field((type) => String)
	public password: String;

	/**
	 * @ignore
	 * */
	// tslint:disable-next-line: no-empty
	constructor () {}

}



