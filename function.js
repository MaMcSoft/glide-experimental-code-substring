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
