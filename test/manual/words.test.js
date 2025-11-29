import words from "../../src/words.js";

describe("words.js", () => {
  // String of letters and digits
  it("should return array with single word for string of letters and digits", () => {
    const result = words("organic123apples");
    expect(result).toEqual(["organic123apples"]);
  });

  // String has math symbols - +
  it("should split string with + symbol", () => {
    const result = words("gluten+free");
    expect(result).toEqual(["gluten", "free"]);
  });

  // String has math symbols - -
  it("should split string with - symbol", () => {
    const result = words("sugar-free");
    expect(result).toEqual(["sugar", "free"]);
  });

  // String has math symbols - *
  it("should split string with * symbol", () => {
    const result = words("vegan*bread");
    expect(result).toEqual(["vegan", "bread"]);
  });

  // String has math symbols - /
  it("should split string with / symbol", () => {
    const result = words("milk/dairy");
    expect(result).toEqual(["milk", "dairy"]);
  });

  // String has math symbols - ^
  it("should split string with ^ symbol", () => {
    const result = words("vitamin^C");
    expect(result).toEqual(["vitamin", "C"]);
  });

  // String has math symbols - =
  it("should split string with = symbol", () => {
    const result = words("price=low");
    expect(result).toEqual(["price", "low"]);
  });

  // Blank string
  it("should return empty array for blank string", () => {
    const result = words("   ");
    expect(result).toEqual([]);
  });

  // Search with spaces
  it("should handle multiple spaces correctly", () => {
    const result = words(" blueberry  juice");
    expect(result).toEqual(["blueberry", "juice"]);
  });

  // Finnish letters
  it("should handle Finnish letters", () => {
    const result = words("öljy");
    expect(result).toEqual(["öljy"]);
  });

  // Chinese letters
  it("should handle Chinese characters", () => {
    const result = words("面包，黑麦");
    expect(result).toEqual(["面包", "黑麦"]);
  });

  // Null
  it("should return empty array for null", () => {
    const result = words(null);
    expect(result).toEqual([]);
  });

  // Not a string
  it("should convert number to string and return array", () => {
    const result = words(123);
    expect(result).toEqual(["123"]);
  });

  // CamelCase product name
  it("should split camelCase words", () => {
    const result = words("organicSourdoughBread");
    expect(result).toEqual(["organic", "Sourdough", "Bread"]);
  });

  // No match - empty string
  it("should return empty array for empty string", () => {
    const result = words("");
    expect(result).toEqual([]);
  });

  // With defined pattern - custom pattern for hashtags
  it("should extract hashtags with custom pattern", () => {
    const result = words("#organic #vegan", /#\w+/g);
    expect(result).toEqual(["#organic", "#vegan"]);
  });

  // With defined pattern - custom pattern for prices
  it("should extract prices with custom pattern", () => {
    const result = words("$5.99 and $12.50", /\$\d+\.\d+/g);
    expect(result).toEqual(["$5.99", "$12.50"]);
  });

  // With defined pattern - no match
  it("should return empty array when pattern matches nothing", () => {
    const result = words("organic vegan bread", /\d+/g);
    expect(result).toEqual([]);
  });
});
