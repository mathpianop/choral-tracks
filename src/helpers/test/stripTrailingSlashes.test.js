import stripTrailingSlash from "../stripTrailingSlash";

describe("stripTrailingSlash", () => {
  it("removes one slash", () => {
    expect(stripTrailingSlash("word/")).toBe("word");
  })
  it("removes multiple slashes", () => {
    expect(stripTrailingSlash("word////")).toBe("word");
  })
  it("does nothing to a string with no trailing slashes", () => {
    expect(stripTrailingSlash("word")).toBe("word");
  })
})