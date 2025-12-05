import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import * as uploadController from "../controllers/uploadController.js";

const uploadRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|webp/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Seul les images sont aurotorisées'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB file size limit
    fileFilter: fileFilter
});

uploadRouter.post('/upload', upload.single('file'), uploadController.upload);

export default uploadRouter;