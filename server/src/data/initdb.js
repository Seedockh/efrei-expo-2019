import { Sequelize, Op } from 'sequelize';
import fs from 'fs';
import Users from './models/users';
import Posts from './models/posts';
import Categories from './models/categories';

const config = fs.existsSync(__dirname + '/config.json') ? require('./config.json').dev : console.log('data/config.json not found !');

export const db = process.env.NODE_ENV === "production" ?
  new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres'})
  : new Sequelize(
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
  );

db.authenticate()
    .then( (err)=> {console.log('Connection has been establihed successfully.');
})
    .catch( (err) => { console.log('Connection to the database has failed. \n', err);
});

Users.init(db);
Posts.init(db);
Categories.init(db);

Posts.belongsTo(Users);
Categories.hasOne(Posts);
