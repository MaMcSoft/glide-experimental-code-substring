
window.function = function (url, cells) {

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
      const range = cells;
      // Extract the data in the specified range
      const extractedData = XLSX.utils.sheet_to_json(worksheet, { range: range, header: 1 });
      return extractedData;
    }

  return reader;
}
