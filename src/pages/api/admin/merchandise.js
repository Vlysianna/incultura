import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        return await getMerchandise(req, res)
      case 'POST':
        return await createMerchandise(req, res)
      case 'PUT':
        return await updateMerchandise(req, res)
      case 'DELETE':
        return await deleteMerchandise(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Merchandise API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function getMerchandise(req, res) {
  try {
    const merchandise = await prisma.merchandise.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return res.status(200).json(merchandise)
  } catch (error) {
    console.error('Error fetching merchandise:', error)
    return res.status(500).json({ error: 'Failed to fetch merchandise' })
  }
}

async function createMerchandise(req, res) {
  try {
    const { name, description, price, image, category, inStock } = req.body
    
    // Validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, description, price, category' 
      })
    }
    
    if (price <= 0) {
      return res.status(400).json({ 
        error: 'Price must be greater than 0' 
      })
    }
    
    // Ensure image path starts with a leading slash if present
    let imagePath = image?.trim() || null
    if (imagePath && !imagePath.startsWith('/')) imagePath = '/' + imagePath
    const merchandise = await prisma.merchandise.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        image: imagePath,
        category: category.trim(),
        inStock: inStock !== undefined ? inStock : true
      }
    })
    
    return res.status(201).json(merchandise)
  } catch (error) {
    console.error('Error creating merchandise:', error)
    return res.status(500).json({ error: 'Failed to create merchandise' })
  }
}

async function updateMerchandise(req, res) {
  try {
    const { id, name, description, price, image, category, inStock } = req.body
    
    if (!id) {
      return res.status(400).json({ error: 'Merchandise ID is required' })
    }
    
    // Check if merchandise exists
    const existingMerchandise = await prisma.merchandise.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!existingMerchandise) {
      return res.status(404).json({ error: 'Merchandise not found' })
    }
    
    // Prepare update data - only include fields that are provided
    const updateData = {}
    
    if (name !== undefined) updateData.name = name.trim()
    if (description !== undefined) updateData.description = description.trim()
    if (price !== undefined) {
      if (price <= 0) {
        return res.status(400).json({ error: 'Price must be greater than 0' })
      }
      updateData.price = parseFloat(price)
    }
    if (image !== undefined) {
      let imagePath = image?.trim() || null
      if (imagePath && !imagePath.startsWith('/')) imagePath = '/' + imagePath
      updateData.image = imagePath
    }
    if (category !== undefined) updateData.category = category.trim()
    if (inStock !== undefined) updateData.inStock = inStock
    
    const merchandise = await prisma.merchandise.update({
      where: { id: parseInt(id) },
      data: updateData
    })
    
    return res.status(200).json(merchandise)
  } catch (error) {
    console.error('Error updating merchandise:', error)
    return res.status(500).json({ error: 'Failed to update merchandise' })
  }
}

async function deleteMerchandise(req, res) {
  try {
    const { id } = req.body
    
    if (!id) {
      return res.status(400).json({ error: 'Merchandise ID is required' })
    }
    
    // Check if merchandise exists
    const existingMerchandise = await prisma.merchandise.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!existingMerchandise) {
      return res.status(404).json({ error: 'Merchandise not found' })
    }
    
    await prisma.merchandise.delete({
      where: { id: parseInt(id) }
    })
    
    return res.status(200).json({ message: 'Merchandise deleted successfully' })
  } catch (error) {
    console.error('Error deleting merchandise:', error)
    return res.status(500).json({ error: 'Failed to delete merchandise' })
  }
}
