import { Request, Response } from 'express'

import convertHourToMinutes from '../utils/ConvertHourToMinutes';
import db from '../database/connection';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}


export default class ClassController {
  async index(request: Request, response: Response){
    const filters = request.query;
    console.log('entrou aqui no index')

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedules.*')
          .from('class_schedules')
          .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedules`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedules`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedules`.`to` > ??', [timeInMinutes]);

      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'user_id')
      .select([
        'classes.*',
        'users.*'
      ]);
      return response.json(classes);
  }

  async create(request: Request, response: Response){
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUserId = await trx('users').insert({
        name, avatar, whatsapp, bio,
      })

      const userId = insertedUserId[0];
      const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id: userId
      })

      const classId = insertedClassesId[0];

      const classSchedule = schedule.map((item: ScheduleItem)=> {
        return {
          class_id: classId,
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to),
        }
      });
      await trx('class_schedules').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch(err) {
      await trx.rollback();
      response.status(400).json({
        error: "Unexpected error while creating new a classes."
      });
    }
  }
}
