import { Sequelize } from 'sequelize';
import model from '../models/index.js';

const { OpeningHours } = model

const checkOverlappingHours = async (storeId, dayOfWeek, startTime, endTime, openingHourId = null) => {

  const overlappingHours = await OpeningHours.findAll({
    where: {
      storeId: storeId,
      dayOfWeek: dayOfWeek,
      [Sequelize.Op.or]: [
        {
          startTime: { [Sequelize.Op.lt]: endTime },
          endTime: { [Sequelize.Op.gt]: startTime },
        },
        {
          startTime: { [Sequelize.Op.gte]: startTime },
          endTime: { [Sequelize.Op.lte]: endTime },
        },
      ],
      ...( openingHourId ? {id: {[Sequelize.Op.ne]: openingHourId}}: {} )
    },
  });

  return overlappingHours.length > 0
}
export default checkOverlappingHours
