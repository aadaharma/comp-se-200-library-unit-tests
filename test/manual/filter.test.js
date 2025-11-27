import { describe, it, expect } from "@jest/globals";
import filter from "../../src/filter.js";

describe("filter.js", () => {
  // Array with numbers - Match with all elements
  it("should return all elements when predicate matches all", () => {
    const result = filter([45, 78, 34], (price) => price < 100);
    expect(result).toEqual([45, 78, 34]);
  });

  // Array with numbers - Match with multiple elements
  it("should return multiple matching elements", () => {
    const result = filter([45, 78, 34], (price) => price < 50);
    expect(result).toEqual([45, 34]);
  });

  // Array with numbers - Match with none
  it("should return empty array when no elements match", () => {
    const result = filter([45, 78, 34], (price) => price > 500);
    expect(result).toEqual([]);
  });

  // Array with numbers - Predicate always false
  it("should return empty array when predicate always returns false", () => {
    const result = filter([4, 5, 6, 7, 8], () => false);
    expect(result).toEqual([]);
  });

  // Array with strings - Predicate always true
  it("should return all elements when predicate always returns true", () => {
    const result = filter(["milk", "egg", "ham", "cake"], () => true);
    expect(result).toEqual(["milk", "egg", "ham", "cake"]);
  });

  // Array with single element
  it("should filter single element array correctly", () => {
    const result = filter(
      [{ status: "in progress" }],
      (checkout) => checkout.status === "paid"
    );
    expect(result).toEqual([]);
  });

  // Nested arrays
  it("should filter nested arrays by length", () => {
    const result = filter(
      [
        [1, 2, 3],
        [3, 4, 5, 6],
      ],
      (param) => param.length === 4
    );
    expect(result).toEqual([[3, 4, 5, 6]]);
  });

  // Empty array
  it("should return empty array when input is empty", () => {
    const result = filter([], (value) => value === 8);
    expect(result).toEqual([]);
  });

  // Array with objects - Filter by property
  it("should filter objects based on property value", () => {
    const input = [
      { item: "apple", producer: "PirkkaOy", price: 5.2 },
      { item: "milk", producer: "Valio", price: 1.69 },
      { item: "egg", producer: "PirkkaOy", price: 2.59 },
    ];
    const result = filter(input, (p) => p.producer === "PirkkaOy");
    expect(result).toEqual([
      { item: "apple", producer: "PirkkaOy", price: 5.2 },
      { item: "egg", producer: "PirkkaOy", price: 2.59 },
    ]);
  });

  // Array with objects - Filter by boolean value
  it("should filter objects based on truthy property", () => {
    const input = [
      { item: "apple", inStock: 4 },
      { item: "milk", inStock: 3 },
      { item: "egg", inStock: 0 },
    ];
    const result = filter(input, (p) => p.inStock);
    expect(result).toEqual([
      { item: "apple", inStock: 4 },
      { item: "milk", inStock: 3 },
    ]);
  });

  // Array with objects - Filter by arithmetic calculation
  it("should filter objects based on arithmetic condition", () => {
    const input = [
      { price: 9999, qty: 2 },
      { price: 3.5, qty: 1 },
    ];
    const result = filter(input, (item) => item.price * item.qty > 10);
    expect(result).toEqual([{ price: 9999, qty: 2 }]);
  });

  // Array with objects - Missing category
  it("should filter objects when some have missing properties", () => {
    const input = [
      { category: "bread", price: 3.55 },
      { category: "milk", price: 1.2 },
      { category: undefined, price: 7.0 },
    ];
    const result = filter(input, (item) => item.category === "bread");
    expect(result).toEqual([{ category: "bread", price: 3.55 }]);
  });

  // Array with nested objects - Complex condition
  it("should filter nested objects on complex condition", () => {
    const input = [
      { item: "cake", contents: { name: "fat", percent: "10" }, producer: "A" },
      {
        item: "coffee",
        contents: { name: "caffeine", percent: "1" },
        producer: "B",
      },
      {
        item: "cake",
        contents: { name: "sugar", percent: "20" },
        producer: "C",
      },
    ];
    const result = filter(
      input,
      (p) => p.contents.name === "fat" && p.contents.percent < 20
    );
    expect(result).toEqual([
      { item: "cake", contents: { name: "fat", percent: "10" }, producer: "A" },
    ]);
  });

  // Array with mixed types - Filter by nested property
  it("should filter by nested array property", () => {
    const input = [
      { item: "apple", contents: ["vege", "suomi"] },
      { item: "tee", contents: ["vege", "drink", "china"] },
      { item: "tomato", contents: ["organic", "suomi"] },
    ];
    const result = filter(input, (item) => item.contents.includes("suomi"));
    expect(result).toEqual([
      { item: "apple", contents: ["vege", "suomi"] },
      { item: "tomato", contents: ["organic", "suomi"] },
    ]);
  });

  // Error handling - Input is a Set
  it("should throw error for Set input", () => {
    expect(() => {
      filter(new Set([1, 2, 3]), (param) => param === 3);
    }).toThrow();
  });

  // Error handling - Array elements are null
  it("should throw error when accessing properties of null elements", () => {
    expect(() => {
      filter([null, null], (item) => item.id === "maito");
    }).toThrow();
  });

  // Error handling - Invalid first parameter
  it("should throw error for invalid first parameter", () => {
    expect(() => {
      filter(123, (n) => n > 5);
    }).toThrow();
  });

  it("should throw for null", () => {
    expect(() => filter(null, (x) => x)).toThrow();
  });
});
