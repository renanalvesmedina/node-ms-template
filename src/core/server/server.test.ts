import { ServerClass, ServerSingleton } from ".";

describe("Server Classes tests", () => {
	it("check server listen", async () => {
		const server = new ServerClass();

		await server.listen("3131");
		expect(server.server.listening).toBeTruthy();

		await server?.close();
		expect(server.server.listening).toBeFalsy();
	});

	it("check server close", async () => {
		const serverSingleton = await ServerSingleton.getInstance();
		const serverSingleton2 = await ServerSingleton.getInstance();
		expect(serverSingleton).toBe(serverSingleton2);
	});
});
