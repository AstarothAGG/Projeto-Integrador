import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({ storage }).single('photo');

export function handlePhotoUpload(req: Request, res: Response, next: NextFunction): void {
  upload(req, res, function (error) {
    if (error) {
      console.error('Erro no upload da foto:', error);
      res.status(500).json({ message: 'Erro no upload da foto' });
    } else {
      if (req.file) {
        console.log('Foto enviada com sucesso:', req.file.filename);
        res.status(200).json({ message: 'Foto enviada com sucesso' });
      } else {
        console.error('Nenhum arquivo enviado');
        res.status(400).json({ message: 'Nenhum arquivo enviado' });
      }
    }
  });
}
