import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'
import path from 'path'
import fs from 'fs'

// Disable bodyParser to allow formidable (we'll manually parse JSON for non-multipart methods)
export const config = { api: { bodyParser: false } }

const MAX_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

async function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      if (!data) return resolve({})
      try { resolve(JSON.parse(data)) } catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

async function handleUpload(req, res, userId) {
  const formidable = (await import('formidable')).default
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
  const form = formidable({ multiples: false, uploadDir, keepExtensions: true })

  return new Promise(resolve => {
    form.parse(req, async (err, fields, files) => {
      try {
        if (err) {
          res.status(400).json({ error: 'Upload failed' })
          return
        }
        let file = files.avatar
        if (Array.isArray(file)) file = file[0]
        if (!file) {
          res.status(400).json({ error: 'No file uploaded' })
          return
        }
        const size = file.size
        const mime = file.mimetype || file.type
        if (size > MAX_SIZE) {
          res.status(400).json({ error: 'File too large (max 2MB)' })
          return
        }
        if (mime && !ALLOWED_TYPES.includes(mime)) {
          res.status(400).json({ error: 'Unsupported file type' })
          return
        }
        const filename = path.basename(file.filepath || file.path)
        const publicPath = `/uploads/${filename}`
        await prisma.user.update({ where: { id: userId }, data: { image: publicPath } })
        res.status(200).json({ success: true, image: publicPath })
      } catch (e) {
        console.error('Upload handler error', e)
        if (!res.headersSent) res.status(500).json({ error: 'Upload internal error' })
      } finally {
        resolve()
      }
    })
  })
}

export default async function handler(req, res) {
  let userId
  try {
    // Auth / user id resolution
    const queryUserId = req.query.userId
    if (queryUserId) {
      userId = parseInt(queryUserId)
    } else {
      const user = await getServerUser(req, res)
      if (!user) {
        res.status(401).json({ error: 'Authentication required' })
        return
      }
      userId = user.id
    }

    // GET profile
    if (req.method === 'GET') {
      const u = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          activity: { orderBy: { createdAt: 'desc' } }, // original naming
          article: true
        }
      })
      if (!u) {
        res.status(404).json({ error: 'user not found' })
        return
      }
      // Backward compatible shape (add derived plural keys if not present)
      const response = {
        ...u,
        activities: u.activities || u.activity || [],
        articles: u.articles || u.article || []
      }
      res.status(200).json(response)
      return
    }

    // Avatar upload (multipart)
    if (req.method === 'POST') {
      await handleUpload(req, res, userId)
      return
    }

    // Update name / image (JSON)
    if (req.method === 'PUT') {
      let body = {}
      const contentType = req.headers['content-type'] || ''
      if (contentType.startsWith('application/json')) {
        try { body = await parseJsonBody(req) } catch { /* ignore parse error */ }
      }
      const { name, image } = body
      const updateData = {}
      if (typeof name === 'string' && name.trim()) updateData.name = name.trim()
      if (typeof image === 'string' && image.trim()) updateData.image = image.trim()
      if (Object.keys(updateData).length === 0) {
        res.status(400).json({ error: 'No valid fields to update' })
        return
      }
      const updated = await prisma.user.update({ where: { id: userId }, data: updateData })
      res.status(200).json({ success: true, user: updated })
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    console.error('Profile API error', e)
    if (!res.headersSent) res.status(500).json({ error: 'internal server error' })
  }
}
