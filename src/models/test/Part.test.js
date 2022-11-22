import Part from "../Part";

const dataToArray = function(data) {
  const arr = [];
  for (var pair of data.entries()) {
    arr.push(pair);
  }
  return arr;
}

describe("Part", () => {
  it("returns an object with a uniqid key", () => {
    const part = Part();
    expect(typeof part.key).toBe("string");
    expect(part.key.length).toBeGreaterThan(0);
  });
  
  it("returns an object with empty props if called with no args", () => {
    const part = Part();
    expect(part.name).toBe("");
    expect(part.initial).toBe("");
    expect(part.recording).toBe("");
  });

  it("returns an object with mode='new' if called with no args", () => {
    const part = Part();
    expect(part.mode).toBe("new");
  });

  it("returns an object with mode='edit' if called with args", () => {
    const part = Part({});
    expect(part.mode).toBe("edit");
  });

  it("returns an object with recording='existing' if called with args" , () => {
    const part = Part({name: "myObj"});
    expect(part.name).toBe("myObj");
  });

  it("returns an object with all the entries of the passed params object", () => {
    const part = Part({name: "myObj"});
    expect(part.name).toBe("myObj");
  });

  describe("Part#data", () => {
    it("returns a FormData object with entries corresponding to editableProps", () => {
      const part = Part({
        name: "myName", 
        initial: "M", 
        recording: "myRecording",
        pitch_order: 0
      });

      const dataEntries = dataToArray(part.data());
      expect(dataEntries).toContainEqual(["name", "myName"]);
      expect(dataEntries).toContainEqual(["initial", "M"]);
      expect(dataEntries).toContainEqual(["recording", "existing"]);
      expect(dataEntries).toContainEqual(["pitch_order", "0"]);
      
    })
  })


})