module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    name: 'admin',
    email: 'admin@app.com',
    password: '$2a$10$A/.ZZCKScVzCh3SndOKEsudXMS0tRzJMsR54tHCEMmDVUN3CJOTXK',
    isActivated: true,
    isVerified: true,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
