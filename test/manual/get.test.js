import { describe, it, expect } from "@jest/globals";
import get from "../../src/get.js";

describe("get.js", () => {
    it("should get property from object", () => {
        const obj = {'a':'milk'};
        const result = get(obj, 'a');
        expect(result).toBe('milk');
    });

    it("should return undefined for non-existing property", () => {
        const obj = {'a':'milk', 'b':'bread'};
        const result = get(obj, 'c');
        expect(result).toBe(undefined);
    });

    it("should access nested property", () => {
        const obj = {'a':{'milk':'nonfat'}, 'b':'bread'};
        const result = get(obj, 'a.milk');
        expect(result).toBe('nonfat');
    });

    it("should return undefined for non-object param", () => {
        const obj = 1;
        const result = get(obj, '1');
        expect(result).toBe(undefined);
    });

    it("should return default value for non-existing property", () => {
        const obj = {'a':'milk'};
        const result = get(obj, 'bread', 'default');
        expect(result).toBe('default');
    });

    it("should access nested property in a list", () => {
        const obj = {'a':[{'milk':'nonfat'}, {'cream':'fullfat'}], 'b':'bread'}
        const result = get(obj, 'a[1]cream');
        expect(result).toBe('fullfat');
    });

    it("should return undefined for empty path", () => {
        const obj = {'a':'milk'};
        const result = get(obj);
        expect(result).toBe(undefined);
    });

    it("should return undefined for undefined object", () => {
        const result = get(undefined, 'a');
        expect(result).toBe(undefined);
    });

    //Fails, returns undefined
    it("should access property when path is uppercase", () => {
        const result = get({'a':'milk'}, 'A');
        expect(result).toBe('milk');
    });

    it("should acces array by index", () => {
        const result = get([1, 2, 3, 4, 5], '1');
        expect(result).toBe(2);
    });
});