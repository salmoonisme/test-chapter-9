'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tweets.belongsTo(models.Users, { foreignKey: 'userID' });
    }
  }
  Tweets.init({
    userID: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    media: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tweets',
    timestamps: true,
    freezeTableName: true
  });
  return Tweets;
};