import multer from 'multer';
import sharp from 'sharp';
import path from 'path'

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    }
    else {
        cb({ message: "solo formator de imagen" }, false)
    }
}

export const photoUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 }
})

export const imageResize = async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `${Date.now()}-${req.file.originalname}`
    await sharp(req.file.buffer).resize(250, 250).toFormat("jpeg").jpeg({ quality: 90 }).toFile(path.join(`public/images/${req.file.filename}`));
    next()
}