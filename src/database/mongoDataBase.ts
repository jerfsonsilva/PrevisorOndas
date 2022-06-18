import config, { IConfig } from 'config'
import { connect as mongooseConnect, connection } from 'mongoose'

const dbConfig: IConfig = config.get('App.databases.mongo')

export const connect = async (): Promise<void> => {
  await mongooseConnect(dbConfig.get('url'))
}

export const close = (): Promise<void> => connection.close()