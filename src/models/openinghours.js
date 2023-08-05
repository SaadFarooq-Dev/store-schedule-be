import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {

  class OpeningHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OpeningHours.belongsTo(models.Store, { foreignKey: 'storeId' })
    }
  }
  OpeningHours.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    storeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: {
        args: false,
        msg: 'Store must exist for a hours attribute',
      },
      required: true,
      references: 'Stores',
      referencesKey: 'id'
    },
    dayOfWeek: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter your day of week',
      },
      required: true
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: {
        args: false,
        msg: 'Please enter the Opening time',
      },
      required: true
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: {
        args: false,
        msg: 'Please enter the closing time',
      },
      required: true
    },
  }, {
    sequelize,
    modelName: 'OpeningHours',
  });
  return OpeningHours;
};
