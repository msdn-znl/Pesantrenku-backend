require('dotenv').config({path: '../.env'})
module.exports = {
  environment: process.env.ENVIRONMENT,
  host: process.env.HOST,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT || 3000
}