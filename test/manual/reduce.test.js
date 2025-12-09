import { describe, it, expect } from "@jest/globals";
import reduce from "../../src/reduce.js";

describe("reduce.js", () => {
  it("should sum array of integers with initial value", () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
    expect(result).toBe(6);
  });

  it("should sum array with negative numbers", () => {
    const result = reduce([5, -3, 2], (sum, n) => sum + n, 0);
    expect(result).toBe(4);
  });

  it("should sum array with floats", () => {
    const result = reduce([1.11,2.22,3.33], (sum, n) => sum + n, 0);
    expect(result).toBe(6.66);
  });
  //Fails, returns the single element
  it("reduce single element array", () => {
    const result = reduce([{price:500,qty:1}], (total, item) => total+item.price*item.qty, 0);
    expect(result).toBe(500);
  });

  it("reduce empty array with initial value", () => {
    const result = reduce([], (total, item) => total+item.price*item.qty, 0);
    expect(result).toBe(0);
  });

  it("reduce empty array without initial value", () => {
    const result = reduce([], (total, item) => total+item.price*item.qty, );
    expect(result).toBe(undefined);
  });

  it("string concenetation", () => {
    const result = reduce(['a','b','c'], (str,char)=>str+char, '', );
    expect(result).toBe('abc');
  });

  it("reduce array of objects by arithmetic operation", () => {
    const result = reduce([{price:9999,qty:2},{price:3.5,qty:1}], (sum,item)=>sum+item.price*item.qty, 0);
    expect(result).toBe(20001.5);
  });

  it("reduce array of objects by arithmetic operation", () => {
    const result = reduce([{price:500,discount:0.15,qty:2},{price:300,discount:0,qty:1}], (t,i)=>t+i.price*(1-i.discount)*i.qty, 0);
    expect(result).toBe(1150);
  });


  it("reduce array of objects by object property", () => {
    const result = reduce([{apple:{producer:"PirkkaOy"},milk:{producer:"Valio"},egg:{producer:"PirkkaOy"}}], (result, item, productName) => { (result[item.producer] ||= []).push(productName) }, {});
    expect(result).toBe({PirkkaOy:["apple","egg"],Valio:["milk"]});
  });

  
  it("reduce array of objects by condition", () => {
    const result = reduce([{apple:{inStock:4}},{milk:{inStock:3}},{egg:{inStock:0}}], (count,p)=>count + (Object.values(p)[0].inStock > 0 ? 1 : 0), 0);
    expect(result).toBe(2);
  });

  it("reduce wrong input type", () => {
    const result = reduce(123, (sum,n)=>sum+n, 0);
    expect(result).toBe(0);
  });

  it("reduce array of multiple object types", () => {
    const result = reduce([1,{product:{content:'milk'}},2], (sum,n)=>sum+n, 0);
    expect(result).toBe('1[object Object]2');
  });

  it("reduce array with invalid iteratee", () => {
    expect(() => reduce([1,2] , 0)).toThrow(TypeError); 
  });
});
