import { Sequelize, Op } from 'sequelize';
import fs from 'fs';
import Users from './models/users';

const config = fs.existsSync(__dirname + '/config.json') ? require('./config.json').dev : console.log('data/config.json not found !');

export const db = (config) ? new Sequelize(
    config.database,
    config.user,
    config.dialect,
    {
        dialect: config.dialect,
        port: config.port,
        logging: false, // || console.log
        define: {
            timestamps: false
        }
    }
  ) : null;

db.authenticate()
    .then( (err)=> {console.log('Connection has been establihed successfully.');
})
    .catch( (err) => { console.log('Connection to the database has failed. \n', err);
});

Users.init(db);
