import add from "../../src/add.js";

describe("add.js", () => {
  // Two positive integers
  it("should calculate basic cart total", () => {
    const result = add(45, 30);
    expect(result).toBe(75);
  });

  // Two negative integers
  it("should calculate discount total", () => {
    const result = add(-10, -5);
    expect(result).toBe(-15);
  });

  // Very small numbers
  it("should handle precision calculations", () => {
    const result = add(0.00001, 0.00002);
    expect(result).toBeCloseTo(0.00003, 10);
  });
  // Very big numbers
  it("should calculate bulk order totals", () => {
    const result = add(999999999, 1);
    expect(result).toBe(1000000000);
  });

  // Two floating point numbers
  it("should add product prices with cents", () => {
    const result = add(12.99, 8.5);
    expect(result).toBeCloseTo(21.49, 2);
  });

  // Integer and floating point
  it("should calculate subtotal plus tax", () => {
    const result = add(100, 8.75);
    expect(result).toBe(108.75);
  });

  // Two scientific numbers
  it("should handle large bulk orders in scientific notation", () => {
    const result = add(1e3, 2e2);
    expect(result).toBe(1200);
  });

  it("should handle mixed scientific notation", () => {
    const result = add(1.23e3, 2.69e2);
    expect(result).toBe(1499);
  });

  // Two zeros
  it("should handle empty cart and free shipping", () => {
    const result = add(0, 0);
    expect(result).toBe(0);
  });

  // Zero values
  it("should handle empty cart with shipping", () => {
    const result = add(0, 5.99);
    expect(result).toBe(5.99);
  });

  // Positive and negative
  it("should calculate subtotal minus discount", () => {
    const result = add(50.98, -10.0);
    expect(result).toBe(40.98);
  });

  // Error handling - two strings
  it("should throw error for two strings", () => {
    expect(() => add("10", "20")).toThrow();
  });

  // Error handling - two objects
  it("should throw error for two objects", () => {
    expect(() => add({ price: 10 }, { price: 20 })).toThrow();
  });

  // Error handling - two arrays
  it("should throw error for two arrays", () => {
    expect(() => add([10, 20], [30, 40])).toThrow();
  });

  // Error handling - one is null
  it("should throw error when one parameter is null", () => {
    expect(() => add(50, null)).toThrow();
  });
});
