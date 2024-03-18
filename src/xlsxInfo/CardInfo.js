const fs = require("fs");
const XLSX = require("xlsx");

const filePath = "CardInfo.xlsx"; // 替换为你的XLSX文件路径
const outputFilePath = "CardInfo.json"; // 输出文件的路径

// 初始化读取XLSX文件并转换为JSON
let jsonData = readAndConvertXLSX();

//将 jsonData 中的 CardName作为 key
let cardNameMap = {}
jsonData.forEach((item) => {cardNameMap[item.CardName] = item})
// 保存JSON数据到文件
saveJSONToFile(cardNameMap, outputFilePath);

// 监视文件变化
fs.watch(filePath, (eventType, filename) => {
  if (eventType === "change") {
    console.log(`File ${filename} changed. Converting to JSON...`);
    jsonData = readAndConvertXLSX();
    saveJSONToFile(jsonData, outputFilePath);
    console.log(jsonData);
  }
});

function readAndConvertXLSX() {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  // 将XLSX文件转换为JSON
  //xlsx文件的第一行作为属性名
  return XLSX.utils.sheet_to_json(worksheet, {
    header: ["CardIndex", "CardName", "CardText"],
    range: 1,
  });
}

function saveJSONToFile(data, filePath) {
  const jsonContent = JSON.stringify(data, null, 2);
  fs.writeFile(filePath, jsonContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file saved successfully.");
    }
  });
}
