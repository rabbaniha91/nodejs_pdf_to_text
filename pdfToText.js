const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

function convertPdfToText(filePathOrName) {
  return new Promise((resolve, reject) => {
    // If a path is not provided, assume the file is in the current directory
    let filePath = path.isAbsolute(filePathOrName)
      ? filePathOrName
      : path.join(__dirname, filePathOrName);

    fs.readFile(filePath, (err, dataBuffer) => {
      if (err) {
        reject(err);
      } else {
        pdf(dataBuffer)
          .then((data) => {
            // Get the base name of the PDF file and replace the extension with .txt
            let outputFilePath = path.join(
              path.dirname(filePath),
              path.basename(filePath, ".pdf") + ".txt"
            );

            fs.writeFile(outputFilePath, data.text, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(`Text has been written to ${outputFilePath}`);
              }
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

convertPdfToText("010 molecular biology.pdf") // You can also provide a path here
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = convertPdfToText;
