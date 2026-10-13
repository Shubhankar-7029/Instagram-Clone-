require('dotenv').config();
const app = require('./src/app');
const connectToDatabase = require('./src/config/databased');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

connectToDatabase();




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});