import { describe, it, expect } from "@jest/globals";
import eq from "../../src/eq.js";

describe("eq.js", () => {
    it("compare different strings", () => {
        const result = eq("omena","ommena");
        expect(result).toBe(false);
    });
    it("compare equivalent strings", () => {
        const result = eq("omena","omena");
        expect(result).toBe(true);
    });
    it("compare different integers", () => {
        const result = eq(1,0);
        expect(result).toBe(false);
    });
    it("compare equivalent integers", () => {
        const result = eq(2,2);
        expect(result).toBe(true);
    });
    it("compare different floats", () => {
        const result = eq(0.34, 6.778);
        expect(result).toBe(false);
    });
    it("compare equivalent floats", () => {
        const result = eq(5.23,5.23);
        expect(result).toBe(true);
    });
    it("compare different objects", () => {
        const result = eq(Object('green'), Object('milk'));
        expect(result).toBe(false);
    });

    //This fails, returns false
    it("compare equivalent objects", () => {
        const result = eq(Object('milk'),Object('milk'));
        expect(result).toBe(true);
    });
    it("compare different types with same value", () => {
        const result = eq('2', 2);
        expect(result).toBe(true);
    });

    it("compare different types with different value", () => {
        const result = eq('2', 4);
        expect(result).toBe(false);
    });

    //This fails, returns true
    it("compare empty input", () => {
        const result = eq();
        expect(result).toBe(false);
    });

    it("compare empty input with integer", () => {
        const result = eq(1, );
        expect(result).toBe(false);
    });

    it("compare only one parameter", () => {
        const result = eq(8);
        expect(result).toBe(false);
    });

    it("compare different arrays", () => {
        const result = eq([1,2,3], [4,5,6]);
        expect(result).toBe(false);
    });
    it("compare equivalent arrays", () => {
        const result = eq([1,2,3], [1,2,3]);
        expect(result).toBe(false);
    });
    it("compare equivalent nulls", () => {
        const result = eq(null, null);
        expect(result).toBe(true);
    });
    it("compare null with integer", () => {
        const result = eq(null, 1);
        expect(result).toBe(false);
    });

    it("compare different types with same value: boolean and string", () => {
        const result = eq(true, 'true');
        expect(result).toBe(false);
    });
    it("compare equivalent booleans", () => {
        const result = eq(true, true);
        expect(result).toBe(true);
    });
    it("compare different booleans", () => {
        const result = eq(true, false);
        expect(result).toBe(false);
    });
});