import multer from "multer";
import fs from "fs-extra";
import path from "path";

export const createUploadFolder = (req, res, next) => {
    const folderName = Date.now().toString(); 
    req.folderName = folderName;
    req.uploadPath = path.join("uploads", folderName, "staging");
    fs.ensureDirSync(req.uploadPath);           
    next();    
}

const storage = multer.diskStorage({
  destination: function (req, res, cb) {    
    cb(null, req.uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const uploadFiles = multer({ storage });