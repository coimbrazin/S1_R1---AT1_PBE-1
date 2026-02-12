import multer from "multer";
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

// Variavel que salva o caminho para salvar na pasta uploads na raiz do projeto

const baseUploadDir = path.resolve(process.cwd(), 'uploads');

// Verifica se essa pasta existe

const verificaDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
};

const createMulter = ({ folder, allowedTypes, fileSize }) => {
    // Monta caminho do diretório base (uploads) + pasta
    const uploadDir = path.join(baseUploadDir, folder);
    // Verifica se o diretório não existe para criar
    verificaDir(uploadDir);

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(12).toString('hex');
            cb(null, `${hash}-${file.originalname}`)
        }
    }
    );

    const fileFilter = (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo inválido'));
        }
        cb(null, true);
    }

    return multer({
        storage,
        limits: { fileSize },
        fileFilter
    });
};

export default createMulter;