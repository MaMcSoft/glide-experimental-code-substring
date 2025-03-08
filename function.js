window.function = async function(url, cells) {
  try {
    const fileUrl = url.value ?? "";
    const cellsRange = cells.value ?? "";
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: cellsRange });
    const extract = JSON.stringify(jsonData, null, 2);
    console.log("Extracted Data:", extract);
    return extract;
  } catch (error) {
    console.error("Error fetching or processing the Excel file:", error);
  }
}

/*window.function = function (url, cells) {

  fileUrl = url.value ?? "";
  cellsRange = cells.value ?? "";
  var extract = "";

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
      
      extract = JSON.stringify(jsonData, null, 2)
      return extract;
    })
    .catch(error => {
      console.error('Error fetching or processing the Excel file:', error);
    });
    
}*/
