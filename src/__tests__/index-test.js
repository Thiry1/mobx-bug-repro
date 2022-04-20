const Store = require("../");
const { configure } = require("mobx");

describe("Store", () => {
  describe("run test case with `useProxies: \"always\"`", ()  => {
    configure({ useProxies: "always" });
    runTestCases();
  });
  describe("run test case with `useProxies: \"never\"`", ()  => {
    configure({ useProxies: "never" });
    runTestCases();
  });
});

function runTestCases() {
  configure({ safeDescriptors: true });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const store = new Store({
    foo: "foo",
  });

  it("case1", () => {
    expect(store.isFoo).toBe(true);
    expect(store.state.foo).toBe("foo");
  });
  it("case2", () => {
    jest.spyOn(store.state, "foo", "get").mockReturnValue("bar");
    expect(store.isFoo).toBe(false);
    expect(store.state.foo).toBe("bar");
  });
  it("case3(same as case1)", () => {
    expect(store.isFoo).toBe(true);
    expect(store.state.foo).toBe("foo");
  });
}
