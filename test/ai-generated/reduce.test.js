import reduce from "../../src/reduce.js";

describe("reduce()", () => {
  describe("happy path with arrays", () => {
    test("should sum array of numbers with initial value", () => {
      const result = reduce([1, 2, 3, 4, 5], (sum, n) => sum + n, 0);
      expect(result).toBe(15);
    });

    test("should sum array without initial value", () => {
      const result = reduce([1, 2, 3, 4, 5], (sum, n) => sum + n);
      expect(result).toBe(15);
    });

    test("should concatenate strings", () => {
      const result = reduce(
        ["Hello", " ", "World"],
        (acc, str) => acc + str,
        ""
      );
      expect(result).toBe("Hello World");
    });

    test("should build object from array", () => {
      const result = reduce(
        [
          ["a", 1],
          ["b", 2],
          ["c", 3],
        ],
        (obj, [key, val]) => {
          obj[key] = val;
          return obj;
        },
        {}
      );
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    test("should collect all values into array", () => {
      const result = reduce([1, 2, 3], (arr, n) => [...arr, n * 2], []);
      expect(result).toEqual([2, 4, 6]);
    });

    test("should have access to index parameter", () => {
      const indices = [];
      reduce(
        [10, 20, 30],
        (acc, val, idx) => {
          indices.push(idx);
          return acc + val;
        },
        0
      );
      expect(indices).toEqual([0, 1, 2]);
    });

    test("should have access to array parameter", () => {
      const result = reduce(
        [1, 2, 3],
        (sum, val, idx, array) => {
          // Add current value and first element of array
          return sum + val + array[0];
        },
        0
      );
      expect(result).toBe(9); // (0+1+1) + (2+1) + (3+1) = 9
    });
  });

  describe("edge cases with arrays", () => {
    test("should handle empty array without initial value", () => {
      const result = reduce([], (acc, val) => acc + val);
      // Correct behavior: undefined for empty array with no initial
      expect(result).toBeUndefined();
    });

    test("should handle empty array with initial value", () => {
      const result = reduce([], (acc, val) => acc + val, 0);
      expect(result).toBe(0);
    });

    test("should handle null array with initial value", () => {
      const result = reduce(null, (acc, val) => acc + val, 0);
      expect(result).toBe(0);
    });

    test("should handle undefined array with initial value", () => {
      const result = reduce(undefined, (acc, val) => acc + val, 0);
      expect(result).toBe(0);
    });

    test("should handle single element without initial value", () => {
      const result = reduce([42], (acc, val) => acc + val);
      expect(result).toBe(42);
    });

    test("should handle single element with initial value", () => {
      const result = reduce([42], (acc, val) => acc + val, 10);
      expect(result).toBe(52);
    });

    test("should handle falsy values in accumulation", () => {
      const result = reduce([1, 2, 3], (acc, val) => acc + val, null);
      expect(result).toBe(6);
    });

    test("should handle accumulator that is undefined initially", () => {
      const result = reduce([1, 2, 3], (acc, val) => (acc || 0) + val);
      expect(result).toBe(6);
    });

    test("should handle array with falsy elements", () => {
      const result = reduce(
        [0, false, "", null, undefined],
        (arr, val) => {
          arr.push(val);
          return arr;
        },
        []
      );
      expect(result).toEqual([0, false, "", null, undefined]);
    });
  });

  describe("objects and collections", () => {
    test("should reduce object properties", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = reduce(obj, (sum, val) => sum + val, 0);
      expect(result).toBe(6);
    });

    test("should handle object with mixed value types", () => {
      const obj = { name: "John", age: 30, active: true };
      const result = reduce(
        obj,
        (acc, val) => {
          acc.push(val);
          return acc;
        },
        []
      );
      expect(result.length).toBe(3);
      expect(result).toContain("John");
      expect(result).toContain(30);
      expect(result).toContain(true);
    });

    test("should handle array-like objects", () => {
      const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
      const result = reduce(arrayLike, (acc, val) => acc + val, "");
      expect(result).toBe("abc");
    });
  });

  describe("boundary tests", () => {
    test("should handle iteratee that returns different types", () => {
      const result = reduce([1, 2, 3], (acc, val) => {
        if (typeof acc === "number") {
          return { count: acc, values: [val] };
        } else {
          acc.count++;
          acc.values.push(val);
          return acc;
        }
      });
      // BUG: When no initial accumulator is provided, the first element is used as
      // accumulator but subsequent elements are not all properly counted in iteration
      expect(result.count).toBe(3);
      expect(result.values).toEqual([2, 3]);
    });

    test("should handle complex accumulator object", () => {
      const result = reduce(
        [
          { type: "income", amount: 100 },
          { type: "expense", amount: 50 },
          { type: "income", amount: 75 },
        ],
        (acc, item) => {
          if (item.type === "income") {
            acc.income += item.amount;
          } else {
            acc.expense += item.amount;
          }
          return acc;
        },
        { income: 0, expense: 0 }
      );
      expect(result).toEqual({ income: 175, expense: 50 });
    });

    test("should not mutate original array", () => {
      const original = [1, 2, 3];
      const copy = [...original];
      reduce(original, (acc, val) => acc + val, 0);
      expect(original).toEqual(copy);
    });

    test("should handle large array", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
      const result = reduce(largeArray, (sum, n) => sum + n, 0);
      expect(result).toBe(500500); // Sum of 1 to 1000
    });

    test("should handle deeply nested accumulator", () => {
      const result = reduce(
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        (acc, pair) => {
          acc.pairs.push(pair);
          acc.sum += pair[0] + pair[1];
          return acc;
        },
        { pairs: [], sum: 0 }
      );
      expect(result.sum).toBe(21);
      expect(result.pairs.length).toBe(3);
    });

    test("should handle array of objects with key extraction", () => {
      const items = [
        { id: 1, name: "Item A" },
        { id: 2, name: "Item B" },
        { id: 3, name: "Item C" },
      ];
      const result = reduce(
        items,
        (acc, item) => {
          acc[item.id] = item.name;
          return acc;
        },
        {}
      );
      expect(result).toEqual({ 1: "Item A", 2: "Item B", 3: "Item C" });
    });

    test("should preserve execution order", () => {
      const order = [];
      reduce(
        [1, 2, 3, 4, 5],
        (acc, val) => {
          order.push(val);
          return acc + val;
        },
        0
      );
      expect(order).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("food e-commerce context", () => {
    test("should calculate total cart price", () => {
      const cartItems = [
        { name: "Apple", price: 1.5, quantity: 3 },
        { name: "Bread", price: 2.99, quantity: 2 },
        { name: "Milk", price: 3.49, quantity: 1 },
      ];
      const total = reduce(
        cartItems,
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      expect(total).toBeCloseTo(13.97, 2);
    });

    test("should count total items in cart", () => {
      const cartItems = [
        { name: "Tomato", quantity: 5 },
        { name: "Cucumber", quantity: 3 },
        { name: "Lettuce", quantity: 2 },
      ];
      const totalQty = reduce(cartItems, (sum, item) => sum + item.quantity, 0);
      expect(totalQty).toBe(10);
    });

    test("should group products by category", () => {
      const products = [
        { name: "Apple", category: "Fruits" },
        { name: "Carrot", category: "Vegetables" },
        { name: "Banana", category: "Fruits" },
        { name: "Broccoli", category: "Vegetables" },
        { name: "Orange", category: "Fruits" },
      ];
      const grouped = reduce(
        products,
        (acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product.name);
          return acc;
        },
        {}
      );
      expect(grouped).toEqual({
        Fruits: ["Apple", "Banana", "Orange"],
        Vegetables: ["Carrot", "Broccoli"],
      });
    });

    test("should calculate inventory value by category", () => {
      const inventory = [
        { name: "Milk", category: "Dairy", value: 250.0 },
        { name: "Cheese", category: "Dairy", value: 180.0 },
        { name: "Tomato", category: "Produce", value: 120.0 },
        { name: "Lettuce", category: "Produce", value: 85.5 },
      ];
      const valueByCategory = reduce(
        inventory,
        (acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = 0;
          }
          acc[item.category] += item.value;
          return acc;
        },
        {}
      );
      expect(valueByCategory).toEqual({
        Dairy: 430.0,
        Produce: 205.5,
      });
    });

    test("should find products within price range", () => {
      const products = [
        { name: "Apple", price: 0.99 },
        { name: "Salmon", price: 12.99 },
        { name: "Banana", price: 0.59 },
        { name: "Chicken", price: 8.99 },
      ];
      const inRange = reduce(
        products,
        (acc, product) => {
          if (product.price >= 5 && product.price <= 15) {
            acc.push(product.name);
          }
          return acc;
        },
        []
      );
      expect(inRange).toEqual(["Salmon", "Chicken"]);
    });

    test("should aggregate delivery zone coverage", () => {
      const orders = [
        { zone: "North", completed: true },
        { zone: "South", completed: true },
        { zone: "North", completed: false },
        { zone: "East", completed: true },
        { zone: "South", completed: true },
      ];
      const coverage = reduce(
        orders,
        (acc, order) => {
          if (!acc[order.zone]) {
            acc[order.zone] = { completed: 0, total: 0 };
          }
          acc[order.zone].total++;
          if (order.completed) {
            acc[order.zone].completed++;
          }
          return acc;
        },
        {}
      );
      expect(coverage.North).toEqual({ completed: 1, total: 2 });
      expect(coverage.South).toEqual({ completed: 2, total: 2 });
      expect(coverage.East).toEqual({ completed: 1, total: 1 });
    });
  });
});
