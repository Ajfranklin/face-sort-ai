import express from 'express'
import { upload } from './controller/uploadController.js'
import { uploadFiles, createUploadFolder } from './middlewares/uploadFiles.js'

const router = express.Router()

router.post('/upload', createUploadFolder, uploadFiles.array("files"), upload)

export default router