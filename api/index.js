//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const MONGODB = process.env.MONGODB;
const MONGODB_URL = process.env.MONGODB_URL;

if (MONGODB === 'active') {
  mongoose.set('strictQuery', true);
  mongoose.connect(MONGODB_URL)
    .then(() => {
      server.listen(PORT, () => {
        console.log(`Server listening at ${PORT} with MongoDB.`); // eslint-disable-line no-console
      });
    })
    .catch(err => console.log('ERROR MONGODB: ', err));
}
else {
  // Syncing all the models at once.
  conn.sync({ force: true })
    .then(() => {
      server.listen(PORT, () => {
        console.log(`Server listening at ${PORT} with Postgres.`); // eslint-disable-line no-console
      });
    })
    .catch(err => console.log('ERROR SEQUELIZE: ', err));
}