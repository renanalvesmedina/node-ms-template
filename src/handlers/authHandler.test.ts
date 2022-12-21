import { AuthHandler } from "./authHandler";

const authHandler = new AuthHandler();
describe("Auth handler tests", () => {
	it("get Auth By Token", async () => {
		const result = await authHandler.get("123456");
		expect(result).toMatchObject({
				_id: expect.any(String),
				email: expect.any(String),
				password: expect.any(String) });
	});
});

it("post Auth By Token", async () => {
	const result = await authHandler.post({ email: "test@test.com", password: "123456" });
	expect(result).toMatchObject({ _id: expect.any(String), email: expect.any(String), password: expect.any(String) });
});
