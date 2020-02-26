import cron from 'cron'
import { crawlPorchCrew } from './crawlers.js'

const CronJob = cron.CronJob

export const porchCrewCron = new CronJob('* 0 * * * *', crawlPorchCrew);

