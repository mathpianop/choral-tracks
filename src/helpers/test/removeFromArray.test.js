import removeFromObjectArray from "../removeFromObjectArray";

describe("removeFromObjectArray", () => {
  it("returns a new array", () => {
    const array = [{a:1},{a:2},{a:3}]
    const newArray = removeFromObjectArray(array, "a", 2);
    expect(newArray).not.toBe(array);
  });

  it("returns an array with the passed item removed", () => {
    const array = [{a:1},{a:2},{a:3}]
    const newArray = removeFromObjectArray(array, "a", 2);
    expect(newArray).toContainEqual({a:1},{a:3});
    expect(newArray.length).toBe(2);
  })
})