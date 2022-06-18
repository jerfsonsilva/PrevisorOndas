const { resolve } = require('path');
const root = resolve(__dirname);
const aliasList = require('./alias.json')
const modulesAlias = {}
Object.entries(aliasList).map((value) => {
    modulesAlias[`@${value[0]}/(.*)`] = `<rootDir>/${value[1]}/$1`
})
module.exports = {
    rootDir: root,
    displayName: 'root-tests',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    testEnvironment: 'node',
    clearMocks: true,
    preset: 'ts-jest',
    moduleNameMapper: modulesAlias
};