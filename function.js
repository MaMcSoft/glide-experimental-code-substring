window.function = async function(url, cells, index) {
  try {
    const fileUrl = url.value ?? "";
    let cellsRange = cells.value ?? "";
    let sheetsIndex = index.value ?? "";
    const response = await fetch(fileUrl);

    let results = [];

    cellsRange = cellsRange.split(",");
    sheetsIndex = sheetsIndex.split(",");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    for (let i = 0; i < sheetsIndex.length; i++) {
      let sheet = sheetsIndex[i];
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: cellsRange[i] });
      const extract = JSON.stringify(jsonData, null, 2);
      console.log("Extracted Data:", extract);
      results.push(extract);
  }
    return JSON.stringify(results, null, 2);

  } catch (error) {
    console.error("Error fetching or processing the Excel file:", error);
  }
}
