'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    author: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "author is required"
        }
      }
    },
    title: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "title is required"
        }
      }
    },
    body: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "body is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};