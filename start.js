require('dotenv').config({ path: './.env' });

// Start our app!
const app = require('./backend/app');

app.set('port', 9000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → http://localhost:${server.address().port}`);
});
