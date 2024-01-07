const path = require("path");
const convertPdfToText = require("./pdfToText.js"); // replace with the path to your script

// Mock the pdf-parse library
jest.mock("pdf-parse", () =>
  jest.fn(() => Promise.resolve({ text: "This is some test text." }))
);

// Mock the fs module
jest.mock("fs", () => ({
  readFile: jest.fn((filePath, callback) => callback(null, "dataBuffer")),
  writeFile: jest.fn((filePath, data, callback) => callback(null)),
}));

test("converts PDF to text", () => {
  const fs = require("fs");
  const pdf = require("pdf-parse");

  // Call the function with a test file name
  return convertPdfToText("test.pdf").then((message) => {
    // Check that readFile was called with the correct arguments
    expect(fs.readFile).toHaveBeenCalledWith(
      path.join(__dirname, "test.pdf"),
      expect.any(Function)
    );

    // Check that pdf was called with the correct arguments
    expect(pdf).toHaveBeenCalledWith("dataBuffer");

    // Check that writeFile was called with the correct arguments
    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(__dirname, "test.txt"),
      "This is some test text.",
      expect.any(Function)
    );

    // Check that the success message is correct
    expect(message).toEqual(
      `Text has been written to ${path.join(__dirname, "test.txt")}`
    );
  });
});
