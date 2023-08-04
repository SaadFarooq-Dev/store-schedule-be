import checkOverlappingHours from '../helpers/checkOverlappingHours';
import model from '../models';

const { OpeningHours, sequelize } = model

export const createStoreOpeningHour = async (req, res, next) => {

  const storeId = req.params.id
  const data = req.body

  try {
    let openingHoursToCreate = []
    const existingStoreHours = await OpeningHours.findAll({ where: { storeId: storeId }, order: [['dayOfWeek', 'ASC'], ['startTime', 'ASC']] });

    for (const storeHour of data) {
      const { dayOfWeek, startTime, endTime } = storeHour;
      const overlappingStore = existingStoreHours.find((existingHour) =>
        existingHour.dayOfWeek === dayOfWeek &&
        (
          (existingHour.startTime < endTime && existingHour.endTime > startTime) ||
          (existingHour.startTime >= startTime && existingHour.endTime <= endTime)
        )
      );
      if (overlappingStore || startTime > endTime) {
        return res.status(400).json({ error: startTime > endTime ? 'Invalid start and end time.' : 'Overlapping store hours.' });
      }
      openingHoursToCreate.push({ storeId, dayOfWeek, startTime, endTime })
    }

    const openingHours = await OpeningHours.bulkCreate(openingHoursToCreate, { returning: true })
    return res.status(200).json({ message: 'Success', openingHours })
  } catch (error) {
    next(error)
  }
}

export const updateStoreOpeningHour = async (req, res, next) => {

  const storeId = req.params.id
  const openingHourId = req.params.openingHourId

  const { dayOfWeek, startTime, endTime } = req.body

  if (startTime >= endTime) {
    return res.status(400).json({ error: 'Invalid opening Hours' })
  }

  try {

    const invalidHours = await checkOverlappingHours(storeId, dayOfWeek, startTime, endTime, openingHourId)

    if (invalidHours) {
      return res.status(400).json({ error: 'OverLapping opening Hours' })
    }

    const [rowsUpdate, [openingHours]] = await OpeningHours.update(req.body, { where: { id: openingHourId }, returning: true })

    return res.status(200).json({ message: 'Success', openingHours })
  } catch (error) {
    next(error)
  }
}

export const getStoreOpeningHours = async (req, res, next) => {
  const storeId = req.params.id

  try {
    const openingHours = await OpeningHours.findAll({
      where: { storeId: storeId },
      attributes: [
        'storeId',
        'dayOfWeek',
        [sequelize.literal(`array_agg(jsonb_build_object('startTime', "startTime", 'endTime', "endTime"))`), 'schedule']
      ],
      group: ['storeId', 'dayOfWeek'],
      order: [['dayOfWeek', 'ASC']]
    })
    return res.status(200).json({ message: 'Success', openingHours })
  } catch (error) {
    next(error)
  }
}

export const deleteStoreOpeningHours = async (req, res, next) => {
  const storeId = req.params.id
  const { dayOfWeek } = req.body;
  try {

    const openingHours = await OpeningHours.destroy({ where: { storeId: storeId, dayOfWeek: dayOfWeek } })
    return res.status(200).json({ message: 'Success', openingHours })

  } catch (error) {
    next(error)
  }
}
