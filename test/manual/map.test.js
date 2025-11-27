import map from "../../src/map.js";

describe("map.js", () => {
  // Array with numbers
  it("should apply 20% discount on prices", () => {
    const result = map([5.2, 1.69, 2.59], (price) => price * 0.8);
    expect(result).toEqual([4.16, 1.352, 2.072]);
  });

  it("should add 10% tax to prices", () => {
    const result = map([45, 78, 34], (price) => price * 1.1);
    expect(result).toEqual([49.5, 85.8, 37.4]);
  });

  it("should convert numbers to currency strings", () => {
    const result = map([1.5, 2.0, 3.99], (price) => "€" + price);
    expect(result).toEqual(["€1.5", "€2.0", "€3.99"]);
  });

  // Single-element array
  it("should format single price to 2 decimal places", () => {
    const result = map([9.99], (price) => price.toFixed(2));
    expect(result).toEqual(["9.99"]);
  });

  // Empty array
  it("should handle empty array with normal iteratee", () => {
    const result = map([], (item) => item * 2);
    expect(result).toEqual([]);
  });

  // Array of strings
  it("should capitalize first letter of strings", () => {
    const result = map(
      ["miLk", "egg", "breaD"],
      (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    );
    expect(result).toEqual(["Milk", "Egg", "Bread"]);
  });

  // Nested arrays
  it("should return array lengths", () => {
    const result = map([[1, 2], [3, 4, 5], [6]], (arr) => arr.length);
    expect(result).toEqual([2, 3, 1]);
  });

  it("should join nested arrays with delimiter", () => {
    const result = map(
      [
        ["a", "b"],
        ["c", "d"],
      ],
      (arr) => arr.join("-")
    );
    expect(result).toEqual(["a-b", "c-d"]);
  });

  // Array of objects
  it("should extract product names", () => {
    const result = map(
      [
        { item: "apple", price: 5.2 },
        { item: "milk", price: 1.69 },
      ],
      (p) => p.item
    );
    expect(result).toEqual(["apple", "milk"]);
  });

  it("should calculate total per item", () => {
    const result = map(
      [
        { price: 3.5, qty: 2 },
        { price: 1.2, qty: 5 },
      ],
      (item) => item.price * item.qty
    );
    expect(result).toEqual([7.0, 6.0]);
  });

  it("should format objects for display", () => {
    const result = map(
      [{ item: "cake", producer: "Fazer" }],
      (p) => p.item + " by " + p.producer
    );
    expect(result).toEqual(["cake by Fazer"]);
  });

  it("should check stock availability", () => {
    const result = map(
      [
        { item: "apple", inStock: 4 },
        { item: "egg", inStock: 0 },
      ],
      (p) => p.inStock > 0
    );
    expect(result).toEqual([true, false]);
  });

  // Nested objects
  it("should extract nested property", () => {
    const result = map(
      [
        { item: "cake", details: { weight: 500 } },
        { item: "bread", details: { weight: 300 } },
      ],
      (p) => p.details.weight
    );
    expect(result).toEqual([500, 300]);
  });

  it("should format nested data", () => {
    const result = map(
      [{ item: "tea", details: { origin: "China" } }],
      (p) => p.item + " from " + p.details.origin
    );
    expect(result).toEqual(["tea from China"]);
  });

  // Special iteratee
  it("should handle iteratee returning null", () => {
    const result = map([], () => null);
    expect(result).toEqual([]);
  });

  // Error handling
  it("should throw error for invalid collection type", () => {
    expect(() => map(123, (n) => n * 2)).toThrow();
  });

  it("should throw error for non-array input (Set)", () => {
    expect(() => map(new Set([1, 2, 3]), (n) => n * 2)).toThrow();
  });

  it("should throw error for invalid iteratee type", () => {
    expect(() => map([1, 2, 3], null)).toThrow();
  });
});
