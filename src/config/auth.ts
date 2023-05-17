export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'Institute_DRD',
    expiresIn: '1d',
  },
};
