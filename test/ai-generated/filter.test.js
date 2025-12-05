import filter from "../../src/filter.js";

describe("filter()", () => {
  describe("happy path", () => {
    test("should filter array with simple predicate", () => {
      const result = filter([1, 2, 3, 4, 5], (n) => n > 2);
      expect(result).toEqual([3, 4, 5]);
    });

    test("should filter array of objects by property", () => {
      const users = [
        { name: "Alice", active: true },
        { name: "Bob", active: false },
        { name: "Charlie", active: true },
      ];
      const result = filter(users, (user) => user.active);
      expect(result).toEqual([
        { name: "Alice", active: true },
        { name: "Charlie", active: true },
      ]);
    });

    test("should use index parameter in predicate", () => {
      const result = filter([10, 20, 30, 40], (val, idx) => idx < 2);
      expect(result).toEqual([10, 20]);
    });

    test("should use array parameter in predicate", () => {
      const arr = [5, 10, 15];
      const result = filter(arr, (val, idx, array) => array[0] < val);
      expect(result).toEqual([10, 15]);
    });
  });

  describe("edge cases", () => {
    test("should return empty array when predicate returns false for all elements", () => {
      const result = filter([1, 2, 3], () => false);
      // Correct behavior: return empty array
      // BUG: Current implementation returns [[]] due to result = [[]]
      expect(result).toEqual([]);
    });

    test("should return all elements when predicate returns true for all", () => {
      const arr = [1, 2, 3];
      const result = filter(arr, () => true);
      expect(result).toEqual([1, 2, 3]);
    });

    test("should handle null array", () => {
      const result = filter(null, (val) => true);
      // Correct behavior: return empty array for null
      // BUG: Current implementation returns [[]]
      expect(result).toEqual([]);
    });

    test("should handle undefined array", () => {
      const result = filter(undefined, (val) => true);
      // Correct behavior: return empty array for undefined
      // BUG: Current implementation returns [[]]
      expect(result).toEqual([]);
    });

    test("should handle empty array", () => {
      const result = filter([], (val) => true);
      // Correct behavior: return empty array
      // BUG: Current implementation returns [[]]
      expect(result).toEqual([]);
    });

    test("should handle single element array", () => {
      const result = filter([42], (val) => val === 42);
      expect(result).toEqual([42]);
    });

    test("should handle falsy values (0, false, empty string)", () => {
      const result = filter([0, false, "", null, undefined], (val) => true);
      expect(result).toEqual([0, false, "", null, undefined]);
    });

    test("should handle mixed types", () => {
      const arr = [1, "hello", true, { x: 1 }, null, undefined];
      const result = filter(arr, (val) => val !== null && val !== undefined);
      expect(result).toEqual([1, "hello", true, { x: 1 }]);
    });
  });

  describe("boundary tests", () => {
    test("should filter with predicate checking element value type", () => {
      const result = filter(
        [1, "2", 3, "4", 5],
        (val) => typeof val === "number"
      );
      expect(result).toEqual([1, 3, 5]);
    });

    test("should handle predicate that accesses nested properties", () => {
      const items = [
        { product: { price: 10, inStock: true } },
        { product: { price: 20, inStock: false } },
        { product: { price: 5, inStock: true } },
      ];
      const result = filter(items, (item) => item.product.inStock);
      expect(result).toEqual([
        { product: { price: 10, inStock: true } },
        { product: { price: 5, inStock: true } },
      ]);
    });

    test("should preserve order of filtered elements", () => {
      const result = filter([5, 1, 8, 3, 9, 2], (val) => val > 3);
      expect(result).toEqual([5, 8, 9]);
    });

    test("should not mutate original array", () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      filter(original, (val) => val > 2);
      expect(original).toEqual(copy);
    });

    test("should handle array with many elements", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const result = filter(largeArray, (val) => val % 2 === 0);
      expect(result.length).toBe(500);
      expect(result[0]).toBe(0);
      expect(result[result.length - 1]).toBe(998);
    });

    test("should handle string array", () => {
      const result = filter(["apple", "banana", "apricot", "avocado"], (str) =>
        str.startsWith("a")
      );
      expect(result).toEqual(["apple", "apricot", "avocado"]);
    });

    test("should pass correct index for each element", () => {
      const indices = [];
      filter([10, 20, 30], (val, idx) => {
        indices.push(idx);
        return true;
      });
      // Expected: [0, 1, 2]
      expect(indices).toEqual([0, 1, 2]);
    });

    test("should pass correct array reference", () => {
      const original = [1, 2, 3];
      let passedArray;
      filter(original, (val, idx, array) => {
        passedArray = array;
        return true;
      });
      expect(passedArray).toBe(original);
    });
  });

  describe("food e-commerce context", () => {
    test("should filter products by availability for food store", () => {
      const products = [
        { id: 1, name: "Apple", available: true },
        { id: 2, name: "Orange", available: false },
        { id: 3, name: "Banana", available: true },
        { id: 4, name: "Grapes", available: false },
      ];
      const result = filter(products, (product) => product.available);
      expect(result).toEqual([
        { id: 1, name: "Apple", available: true },
        { id: 3, name: "Banana", available: true },
      ]);
    });

    test("should filter items by price range", () => {
      const items = [
        { name: "Tomato", price: 2.5 },
        { name: "Lettuce", price: 1.99 },
        { name: "Cucumber", price: 0.99 },
        { name: "Bell Pepper", price: 3.49 },
      ];
      const result = filter(items, (item) => item.price >= 2.0);
      expect(result).toEqual([
        { name: "Tomato", price: 2.5 },
        { name: "Bell Pepper", price: 3.49 },
      ]);
    });

    test("should filter by organic certification for food products", () => {
      const foodItems = [
        { name: "Organic Milk", organic: true, price: 5.99 },
        { name: "Regular Milk", organic: false, price: 3.99 },
        { name: "Organic Eggs", organic: true, price: 6.49 },
      ];
      const result = filter(foodItems, (item) => item.organic);
      expect(result).toEqual([
        { name: "Organic Milk", organic: true, price: 5.99 },
        { name: "Organic Eggs", organic: true, price: 6.49 },
      ]);
    });
  });
});
