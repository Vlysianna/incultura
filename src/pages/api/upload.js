import formidable from 'formidable';
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

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public');
  form.keepExtensions = true;
  form.maxFileSize = 5 * 1024 * 1024; // 5MB

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }
    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Rename file to avoid collisions
    const ext = path.extname(file.originalFilename || file.newFilename);
    const base = path.basename(file.newFilename, ext);
    const newName = `${base}${ext}`;
    const newPath = path.join(form.uploadDir, newName);
    try {
      await fs.promises.rename(file.filepath, newPath);
      return res.status(200).json({ path: '/' + newName });
    } catch (e) {
      console.error('File move error:', e);
      return res.status(500).json({ error: 'File save failed' });
    }
  });
}
