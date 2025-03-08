
window.function = function (url, cells) {

  fileUrl = url.value ?? "";
  cellsRange = cells.value ?? "";

  fetch(fileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      // Convert the ArrayBuffer to a Uint8Array
      const data = new Uint8Array(arrayBuffer);
      // Read the workbook from the binary data
      const workbook = XLSX.read(data, { type: 'array' });
      // Select the first worksheet (adjust if needed)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // Define the range you want to extract (for example, A1:D10)
      const range = cellsRange;
      // Convert the specified range to JSON.
      // By default, the first row is used as the header row.
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: range });
      console.log(jsonData);
      return JSON.stringify(jsonData, null, 2).toString();
    })
    .catch(error => {
      console.error('Error fetching or processing the Excel file:', error);
    });
}
