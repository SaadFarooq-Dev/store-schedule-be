import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.User, { foreignKey: 'userId' })
      Store.hasMany(models.OpeningHours, {as: 'openingHours', foreignKey:'storeId'})
    }
  }
  Store.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your store name',
      },
      unique: {
        args: true,
        msg: 'Name already exists',
      },
      required: true
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: {
        args: false,
        msg: 'User must exist for a store',
      },
      required: true,
      references: 'Users',
      referencesKey: 'id'
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};
