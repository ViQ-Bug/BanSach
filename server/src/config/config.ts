import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

export const storageConfig = (folder: string) =>
  diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `./upload/${folder}`;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExt = extname(file.originalname);
      cb(null, `${uniqueSuffix}${fileExt}`);
    },
  });
