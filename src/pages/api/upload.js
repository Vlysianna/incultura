import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public');
  form.keepExtensions = true;
  form.maxFileSize = 5 * 1024 * 1024; // 5MB

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Rename file to avoid collisions
    const ext = path.extname(file.originalFilename);
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const newName = `article-${timestamp}-${randomStr}${ext}`;
    const newPath = path.join(form.uploadDir, 'uploads', newName);
    
    const uploadsDir = path.join(form.uploadDir, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    try {
      await fs.promises.rename(file.filepath, newPath);
      return res.status(200).json({ path: `/uploads/${newName}` });
    } catch (e) {
      console.error('File move error:', e);
      return res.status(500).json({ error: 'File save failed' });
    }
  });
}
