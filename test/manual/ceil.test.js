import { describe, it, expect } from "@jest/globals";
import ceil from "../../src/ceil.js";

describe("ceil.js", () => {
    it("should ceil integer in 0.1 precision", () => {
        const result = ceil(2,1);
        expect(result).toBe(2);
    });
    it("should ceil float in 0.1 precision", () => {
        const result = ceil(3.54,1);
        expect(result).toBe(3.6);
    });
    it("should ceil zero in 0.1 precision", () => {
        const result = ceil(0,1);
        expect(result).toBe(0);
    });
    it("should ceil integer in 0 precision", () => {
        const result = ceil(3);
        expect(result).toBe(3);
    });
    it("should ceil float in 0 precision", () => {
        const result = ceil(4.67);
        expect(result).toBe(5);
    });
    it("should ceil zero in 0 precision", () => {
        const result = ceil(0);
        expect(result).toBe(0);
    });
    it("should ceil integer in 0.01 precision", () => {
        const result = ceil(5,2);
        expect(result).toBe(5);
    });
    it("should ceil float in 0.01 precision", () => {
        const result = ceil(789.033,2);
        expect(result).toBe(789.04);
    });
    it("should ceil zero in 0.01 precision", () => {
        const result = ceil(0,2);
        expect(result).toBe(0);
    });

    //these 5 receive NaN instead of throwing TypeError
    it("should not ceil string", () => {
        const result = ceil("apple");
        expect(result).toBe(0);
    });

    it("should not ceil char", () => {
        expect(() => ceil('a')).toThrow(TypeError); 
    });
    it("should not ceil array of integers", () => {
        expect(() => ceil([1,1,3])).toThrow(TypeError); 
    });
    it("should not ceil null", () => {
        expect(() => ceil(null)).toThrow(TypeError); 
    });
    it("should not ceil undefined", () => {
        expect(() => ceil()).toThrow(TypeError); 
    });

    //This returns NaN, but should throw TypeError
    it("should not ceil when precision is given in string", () => {
        expect(() => ceil(3.05, "0.1")).toThrow(TypeError); 
    });
    
    //This ceils even on precision 0 when precision is null.
    it("should not ceil when precision is null", () => {
        expect(() => ceil(5679.02, null)).toThrow(TypeError); 
    });
    
});