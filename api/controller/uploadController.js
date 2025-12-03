import path from "path";
import fs from 'fs-extra';
import { extractArchive } from "../utils/extractArchives.js";

const ALLOWED_IMAGES = ["png", "jpg", "jpeg"];
const ARCHIVE_TYPES = ["zip", "7z", "rar"];

export const upload = async (req, res) => {
    const folderName = req.folderName;
    const stagePath = path.join("uploads", folderName, "staging");
    const filteredPath = path.join("uploads", folderName, "filtered");
    fs.ensureDirSync(filteredPath);

    let invalidFound = false;
    for (const file of req.files) {
        let ext = path.extname(file.originalname).replace(".", "").toLowerCase();
        const filePath = file.path;
        if (ALLOWED_IMAGES.includes(ext)) {            
            await fs.move(filePath, path.join(filteredPath, file.filename), { overwrite: true });            
        } else if (ARCHIVE_TYPES.includes(ext)){
            const extractFolder = path.resolve(stagePath, file.originalname.split(".")[0]);
            const { validImages, hasInvalid } = await extractArchive(filePath, extractFolder);
            if (hasInvalid) invalidFound = true;
            for (const img of validImages) {                
                await fs.move(img, path.join(filteredPath, path.basename(img)), { overwrite: true });                
            }
        } else {
            invalidFound = true
        }
    }
    fs.remove(stagePath)
    res.send(12)
}

