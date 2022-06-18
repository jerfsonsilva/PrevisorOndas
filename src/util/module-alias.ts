import * as path from 'path'
import moduleAlias from 'module-alias'
import aliasList from '../../alias.json'

const files = path.resolve(__dirname, '../..')

const modulesAlias: { [key: string]: string } = {}
Object.entries(aliasList).map((value) => {
  modulesAlias[`@${value[0]}`] = path.join(files, value[1])
})

moduleAlias.addAliases(modulesAlias)
