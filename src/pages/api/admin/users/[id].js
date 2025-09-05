import prisma from '../../../../../lib/prisma';
import getServerUser from '../../../../../lib/getServerUser';

export default async function handler(req, res) {
  const sessionUser = await getServerUser(req, res);
  if (!sessionUser || !sessionUser.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { id } = req.query;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  // Prevent admin from demoting or deleting themselves
  if (userId === sessionUser.id) {
    if (req.method === 'DELETE') {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }
    if (req.method === 'PUT' && req.body.isAdmin === false) {
      return res.status(400).json({ error: 'You cannot remove your own admin rights.' });
    }
  }

  try {
    switch (req.method) {
      case 'PUT': {
        const { name, email, isAdmin, coins } = req.body;
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            name,
            email,
            isAdmin,
            coins: coins !== undefined ? parseInt(coins) : undefined,
          },
        });
        return res.json(updatedUser);
      }

      case 'DELETE': {
        // Handle related records before deleting the user to avoid constraint violations
        await prisma.activity.deleteMany({ where: { userId } });
        await prisma.article.updateMany({ where: { authorId: userId }, data: { authorId: null } });
        
        await prisma.user.delete({
          where: { id: userId },
        });
        return res.status(204).end(); // No content, successful deletion
      }

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(`API error for /admin/users/${userId}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error', detail: error.message });
  }
}
