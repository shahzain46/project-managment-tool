const usersController = require('../../controllers/users');
const authController = require('../../controllers/auth');

module.exports = (app) => {
  app.get('/api/v1/profile', usersController.getProfile);
  app.post('/api/v1/confirmation', authController.confirmation);
  app.put('/api/v1/confirmation', authController.resend);
};
