export const requireAdmin = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  if (!adminToken || adminToken !== (process.env.ADMIN_TOKEN || 'changeme')) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
