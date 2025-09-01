import prisma from '../lib/prisma.js'

async function migrateMerchandise() {
  try {
    console.log('Starting merchandise migration...')
    
    // First, get all existing merchandise data
    const existingMerchandise = await prisma.$queryRaw`SELECT * FROM merchandise`
    console.log(`Found ${existingMerchandise.length} existing merchandise items`)
    
    // Add new columns with default values
    await prisma.$executeRaw`ALTER TABLE merchandise ADD COLUMN price FLOAT DEFAULT 0`
    await prisma.$executeRaw`ALTER TABLE merchandise ADD COLUMN category VARCHAR(191) DEFAULT 'Lainnya'`
    await prisma.$executeRaw`ALTER TABLE merchandise ADD COLUMN inStock BOOLEAN DEFAULT true`
    await prisma.$executeRaw`ALTER TABLE merchandise ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP`
    
    // Migrate cost to price for existing records
    await prisma.$executeRaw`UPDATE merchandise SET price = cost WHERE cost IS NOT NULL`
    
    // Drop the old cost column
    await prisma.$executeRaw`ALTER TABLE merchandise DROP COLUMN cost`
    
    console.log('Merchandise migration completed successfully!')
    
    // Add createdAt to Quiz table if it doesn't exist
    try {
      await prisma.$executeRaw`ALTER TABLE quiz ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP`
      console.log('Added createdAt to Quiz table')
    } catch (error) {
      if (error.message.includes('Duplicate column name')) {
        console.log('createdAt column already exists in Quiz table')
      } else {
        throw error
      }
    }
    
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

migrateMerchandise()
  .then(() => {
    console.log('Migration script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })
