const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

const folderPathInput = "./input";
const folderPathOutput = "./output";

async function getFileNames() {
  try {
    const files = await fs.readdir(folderPathInput);
    const fileStats = await Promise.allSettled(
      files.map(async (file) => {
        const stats = await fs.lstat(`${folderPathInput}/${file}`);
        return stats.isFile();
      })
    );

    return files.filter(
      (file, index) =>
        fileStats[index].status === "fulfilled" && fileStats[index].value
    );
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

async function getFilesizeInBytes(filename) {
  try {
    var stats = await fs.stat(filename);
  } catch (err) {
    console.error("Error reading file:", err);
    return;
  }
  return stats.size;
}

const BYTE_SIZE = {
  B: 1,
  KB: 1000,
  MB: 1000000,
  GB: 1000000000,
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function getFileSize(fileSize, byteSize) {
  const key = getKeyByValue(BYTE_SIZE, byteSize);
  if (!fileSize) return "unknown";
  if (!key) return "unknown";
  return `${(fileSize / byteSize).toFixed(2)} ${key}`;
}

async function processFile(image, options) {
  try {
    const processed = image.resize(options).webp(options);
    return processed;
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

async function run({
  logging = true,
  performanceInfo = false,
  byteSize = BYTE_SIZE.MB,
  quality = 75,
}) {
  try {
    let start, end;
    if (performanceInfo) {
      start = performance.now();
    }

    const fileNames = await getFileNames();
    const amount = fileNames.length;
    console.log(`Processing ${amount} files...`);

    const fileStatsPromises = fileNames.map(async (fileName) => {
      let fileSize = undefined;
      if (logging) {
        try {
          fileSize = await getFilesizeInBytes(`${folderPathInput}/${fileName}`);
        } catch (err) {
          console.error("Error reading file:", err);
        }
      }

      if (logging) {
        console.log("--------------------------------------------------");
        console.log(`Converting file: ${fileName}`);
        console.log(`[INPUT] file size: ${getFileSize(fileSize, byteSize)}`);
      }

      const inputImagePath = `${folderPathInput}/${fileName}`;
      const fileFormatOutput = ".webp";
      const fileNameOutput = fileName.split(".")[0];

      const outputImagePath = path.join(
        folderPathOutput,
        fileNameOutput + "-compressed" + fileFormatOutput
      );

      // Define the compression and resizing options
      // 0 - 6 (effort, higher is slower but better)
      const options = {
        quality: quality,
        width: 1920,
        height: 1080,
        fit: "inside",
        withoutEnlargement: true,
        effort: 6,
        fastShrinkOnLoad: true,
      };

      const image = sharp(inputImagePath);
      try {
        const processed = await processFile(image, options);
        try {
          const info = await processed.toFile(outputImagePath);

          if (logging) {
            if (fileSize) {
              let sign = '+';
              if (fileSize - info.size > 0) {
                sign = '-'
              }
              console.log(
                `[OUTPUT] file size: ${getFileSize(
                  info.size,
                  byteSize
                )} [${sign}${getFileSize(fileSize - info.size, byteSize)}] [${sign}${(
                  ((fileSize - info.size) / fileSize) *
                  100
                ).toFixed(2)}%]`
              );
            }
            console.log(
              `[OUTPUT] file info: [${info.format}] ${info.width}x${info.height}`
            );
          }
        } catch (err) {
          console.error("Error writing file:", err);
        }
      } catch (err) {
        console.error("Error processing file:", err);
      }
    });

    await Promise.allSettled(fileStatsPromises);

    if (performanceInfo) {
      end = performance.now();
      console.log(`Time elapsed: ${(end - start).toFixed(2)} ms`);
      console.log(
        `Avg time per file: ${((end - start) / amount).toFixed(2)} ms`
      );
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

const args = {
  logging: true,
  performanceInfo: true,
  byteSize: BYTE_SIZE.KB,
  quality: 75,
};

run(args);
