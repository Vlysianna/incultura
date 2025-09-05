import prisma from '../../../../../lib/prisma';
import getServerUser from '../../../../../lib/getServerUser';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const sessionUser = await getServerUser(req, res);
  if (!sessionUser || !sessionUser.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  if (req.method === 'POST') {
    const { name, email, password, isAdmin, coins } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
        coins: coins ? parseInt(coins) : 0,
      },
    });
    return res.status(201).json(newUser);
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
