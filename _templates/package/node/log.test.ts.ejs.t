---
to: "<%= h.src() %>/packages/<%= name %>/src/__tests__/log.test.ts"
---
import { log } from "..";

jest.spyOn(global.console, "log");

describe("logger", () => {
  it("prints a message", () => {
    log("hello");
    expect(console.log).toBeCalled();
  });
});
