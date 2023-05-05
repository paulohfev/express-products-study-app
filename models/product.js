const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIcrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descripton: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Product;
