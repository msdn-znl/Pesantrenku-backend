require('dotenv').config()
const knex = require('knex')
const environment = process.env.ENVIRONMENT || 'development'
const knexConfig = require('./knexfile.js')[environment]
module.exports = knex(knexConfig)
