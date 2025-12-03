import path from "path";
import fs from "fs-extra";
import extract from "extract-zip";      
import Seven from "node-7z";

const ALLOWED_IMAGES = ["png", "jpg", "jpeg"];

export async function extractArchive(filePath, outputFolder) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  await fs.ensureDir(outputFolder);

  if (ext === "zip") {
    console.log(outputFolder)
    await extract(filePath, { dir: outputFolder });
  } 
  else if (ext === "7z" || ext === "rar") {
    await new Promise((resolve, reject) => {
      const stream = Seven.extractFull(filePath, outputFolder, { recursive: true });
      stream.on("end", resolve);
      stream.on("error", reject);
    });
  } 
  else {
    return {
      validImages: [],
      hasInvalid: true,
    };
  }
  const extractedFiles = await getAllFilesRecursively(outputFolder);
  const validImages = extractedFiles.filter((file) =>
    ALLOWED_IMAGES.includes(path.extname(file).slice(1).toLowerCase())
  );
  const hasInvalid = extractedFiles.length !== validImages.length;
  return {
    validImages,
    hasInvalid
  };
}

async function getAllFilesRecursively(dir) {
  let results = [];
  const list = await fs.readdir(dir);

  for (const file of list) {
    const full = path.join(dir, file);
    const stat = await fs.stat(full);

    if (stat.isDirectory()) {
      const nested = await getAllFilesRecursively(full);
      results = results.concat(nested);
    } else {
      results.push(full);
    }
  }

  return results;
}
