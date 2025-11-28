import isEmpty from "../../src/isEmpty.js";

describe("isEmpty.js", () => {
  // Number - integer
  it("should return true for integer", () => {
    const result = isEmpty(42);
    expect(result).toBe(true);
  });

  // Zero - integer
  it("should return true for zero integer", () => {
    const result = isEmpty(0);
    expect(result).toBe(true);
  });

  // Zero in float
  it("should return true for zero float", () => {
    const result = isEmpty(0.0);
    expect(result).toBe(true);
  });

  // Char
  it("should return false for char", () => {
    const result = isEmpty("a");
    expect(result).toBe(false);
  });

  // String
  it("should return false for string", () => {
    const result = isEmpty("hello");
    expect(result).toBe(false);
  });

  // Empty string
  it("should return true for empty string", () => {
    const result = isEmpty("");
    expect(result).toBe(true);
  });

  // Boolean - true
  it("should return true for boolean true", () => {
    const result = isEmpty(true);
    expect(result).toBe(true);
  });

  // Boolean - false
  it("should return false for boolean false", () => {
    const result = isEmpty(false);
    expect(result).toBe(true);
  });

  // Null
  it("should return true for null", () => {
    const result = isEmpty(null);
    expect(result).toBe(true);
  });

  // Numbers array
  it("should return false for numbers array", () => {
    const result = isEmpty([1, 2, 3]);
    expect(result).toBe(false);
  });

  // Strings array
  it("should return false for strings array", () => {
    const result = isEmpty(["a", "b", "c"]);
    expect(result).toBe(false);
  });

  // Nested array
  it("should return false for nested array", () => {
    const result = isEmpty([
      [1, 2],
      [3, 4],
    ]);
    expect(result).toBe(false);
  });

  // Empty array
  it("should return true for empty array", () => {
    const result = isEmpty([]);
    expect(result).toBe(true);
  });

  // Array with empty array
  it("should return true for array with empty array", () => {
    const result = isEmpty([[]]);
    expect(result).toBe(true);
  });

  // Objects array
  it("should return false for objects array", () => {
    const result = isEmpty([{ a: 1 }, { b: 2 }]);
    expect(result).toBe(false);
  });

  // Nested objects array
  it("should return false for nested objects array", () => {
    const result = isEmpty([{ a: { b: 1 } }]);
    expect(result).toBe(false);
  });

  // Array with empty objects
  it("should return true for array with empty objects", () => {
    const result = isEmpty([{}, {}]);
    expect(result).toBe(true);
  });

  // Object
  it("should return false for object", () => {
    const result = isEmpty({ a: 1, b: 2 });
    expect(result).toBe(false);
  });

  // Nested objects
  it("should return false for nested objects", () => {
    const result = isEmpty({ a: { b: 1 } });
    expect(result).toBe(false);
  });

  // Object nested with empty objects
  it("should return false for object nested with empty objects", () => {
    const result = isEmpty({ a: {} });
    expect(result).toBe(false);
  });

  // Map
  it("should return false for map", () => {
    const result = isEmpty(new Map([["key", "value"]]));
    expect(result).toBe(false);
  });

  // Empty map
  it("should return true for empty map", () => {
    const result = isEmpty(new Map());
    expect(result).toBe(true);
  });

  // Set
  it("should return false for set", () => {
    const result = isEmpty(new Set([1, 2, 3]));
    expect(result).toBe(false);
  });

  // Empty set
  it("should return true for empty set", () => {
    const result = isEmpty(new Set());
    expect(result).toBe(true);
  });
});
