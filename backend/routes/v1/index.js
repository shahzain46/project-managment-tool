module.exports = (app) => {
  app.get('/api/v1/', (req, res) => res.json({
    message: 'Welcome to the Node Starter API 🖐',
  }));
};
