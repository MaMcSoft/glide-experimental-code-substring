// The function here takes the parameters that you
// have declared in the `glide.json` file, in the
// same order.
window.function = function (url, range) {
  // For each parameter, its `.value` contains
  // either its value in the type you've declared,
  // or it's `undefined`.  This is a good place to
  // extract the `.value`s and assign default
  // values.

 
    file = url.value ?? "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      // Convert the file data to a Uint8Array
      const data = new Uint8Array(event.target.result);
      // Read the workbook
      const workbook = XLSX.read(data, { type: 'array' });
      // Select the first worksheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // Define the range you want to extract
      const range = 'A1:D10';
      // Extract the data in the specified range
      const extractedData = XLSX.utils.sheet_to_json(worksheet, { range: range, header: 1 });
      return extractedData;
    }

  return reader;
}
