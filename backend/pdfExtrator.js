const fs = require('fs');
const pdfParse = require('pdf-parse');

// Function to extract text from a given PDF file path
function extractTextFromPDF(filePath) {
  return new Promise((resolve, reject) => {
    const dataBuffer = fs.readFileSync(filePath);  // Read the file from the file path

    pdfParse(dataBuffer)  // Parse the PDF buffer to extract text
      .then((data) => {
        resolve(data.text);  // Resolve with the extracted text from the PDF
      })
      .catch((error) => {
        reject(error);  // Reject if there's an error in parsing
      });
  });
}

module.exports = { extractTextFromPDF };  // Export the function to be used in other files
