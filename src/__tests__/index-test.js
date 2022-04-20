const Store = require("../");
const { configure } = require("mobx");

describe("Store", () => {
  describe("run test case with `useProxies: \"never\"`", ()  => {
    configure({ useProxies: "never" });
    runTestCases();
  });
  describe("run test case with `useProxies: \"always\"`", ()  => {
    configure({ useProxies: "always" });
    // Case 3 fails.
    // TypeError: Cannot read properties of undefined (reading 'get')
    //       11 |
    //       12 |   get isFoo() {
    //     > 13 |     return this.state.key === "foo";
    //          |                       ^
    //       14 |   }
    //       15 | }
    //       16 |
    runTestCases();
  });
});

function runTestCases() {
  configure({ safeDescriptors: true });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const store = new Store({
    key: "foo",
  });

  it("case1", () => {
    expect(store.isFoo).toBe(true);
  });
  it("case2", () => {
    jest.spyOn(store.state, "key", "get").mockReturnValue("bar");
    expect(store.isFoo).toBe(false);
  });
  it("case3(same as case1)", () => {
    expect(store.isFoo).toBe(true);
  });
}
