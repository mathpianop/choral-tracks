import ImmutableList from "../ImmutableList";
import Part from "../../models/Part";

describe("ImmutableList", () => {
  describe("get", () => {
    it("returns an array of items equal to the one passed to the factory function", () => {
      const parts = [Part(), Part(), Part()];
      const immutableList = ImmutableList(parts);
      expect(immutableList.get()).toEqual(parts);
    })

    it("returns a frozen array", () => {
      const parts = [Part(), Part(), Part()];
      const immutableList = ImmutableList(parts);
      expect(Object.isFrozen(immutableList.get())).toBe(true);
    })

    it("returns an array with frozen items", () => {
      const parts = [Part(), Part(), Part()];
      const immutableList = ImmutableList(parts);
      immutableList.get().forEach(part => {
        expect(Object.isFrozen(part)).toBe(true);
      });
    });

    it("returns an empty array if passed an empty array with no initializer", () => {
      const list = ImmutableList([]);
      expect(list.get().length).toBe(0);
    });

    it("returns an empty array if passed null with no initializer", () => {
      const list = ImmutableList();
      expect(list.get().length).toBe(0);
    });

    it("returns an array with single object if passed an empty array with an initializer", () => {
      const list = ImmutableList([], Part);
      expect(list.get()[0].mode).toBe("new");
      expect(list.get().length).toBe(1);
    });

    it("returns an array with single object if passed null with an initializer", () => {
      const list = ImmutableList(null, Part);
      expect(list.get()[0].mode).toBe("new");
      expect(list.get().length).toBe(1);
    })


  })

  describe("add", () => {
    it("returns a new ImmutableList with passed item appended", () => {
      const part1 = Part();
      const part2 = Part();
      const part3 = Part();
      const parts = [part1, part2, part3];
      const immutableList = ImmutableList(parts);
      const newPart = Part();
      const newImmutableList = immutableList.add(newPart);
      expect(newImmutableList.get()).toEqual([part1, part2, part3, newPart]);
      expect(newImmutableList).not.toBe(immutableList);
    });
  });

  describe("remove", () => {
    it("removes the item at the specified index and returns a new ImmutableList", () => {
      const part1 = Part();
      const part2 = Part();
      const part3 = Part();
      const parts = [part1, part2, part3];
      const immutableList = ImmutableList(parts);
      const newImmutableList = immutableList.remove(1);
      expect(newImmutableList.get()).toEqual([part1, part3])
    });

    it("returns a new object if there is a change", () => {
      const part1 = Part();
      const part2 = Part();
      const part3 = Part();
      const parts = [part1, part2, part3];
      const immutableList = ImmutableList(parts);
      const newImmutableList = immutableList.remove(1);
      expect(newImmutableList).not.toBe(immutableList);
    });

    it("returns the same, unaltered, object, if the length is 1", () => {
      const immutableList = ImmutableList([Part()]);
      const originalParts = immutableList.get();
      const newImmutableList = immutableList.remove();
      expect(newImmutableList).toBe(immutableList);
      expect(originalParts).toEqual(newImmutableList.get());
    })
  })

  describe("change", () => {
    it("changes given prop of item at given index to given value", () => {
      const part1 = Part();
      const part2 = Part();
      const part3 = Part();
      const parts = [part1, part2, part3];
      const list = ImmutableList(parts);
      const newValue = "Hello World";
      const newList = list.change(1, "key", newValue);
      expect(newList.get()[1].key).toBe(newValue);
    });
  })

  describe("move", () => {
    it("moves the item at the fromIndex to the toIndex", () => {
      const part1 = Part();
      const part2 = Part();
      const part3 = Part();
      const parts = [part1, part2, part3];
      const list = ImmutableList(parts);
      const reorderedList = list.move(2,0).get()
      expect(reorderedList[0]).toBe(part3);
    })

    it("shifts the items in between up or down accordingly", () => {
      const part1 = Part();
      const part2 = Part();
      const part3 = Part();
      const parts = [part1, part2, part3];
      const list = ImmutableList(parts);
      const reorderedList = list.move(2,0).get()
      expect(reorderedList[1]).toBe(part1);
      expect(reorderedList[2]).toBe(part2);
    })
  })
})