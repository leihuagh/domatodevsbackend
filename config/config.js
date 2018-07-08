require('dotenv').config() // inject env

module.exports = {
  'development': {
    'username': null,
    'password': null,
    'database': 'bucket_development',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
