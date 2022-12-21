import log from ".";
import console from "./console";
import file from "./file";

describe("Logger tests", () => {
	it("check logger defined", () => {
		expect(log).toBeDefined();
	});

	it("check logger console defined", () => {
		expect(console).toBeDefined();
	});

	it("check logger file defined", () => {
		expect(file).toBeDefined();
	});
});
