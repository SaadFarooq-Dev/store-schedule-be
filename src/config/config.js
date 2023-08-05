import 'dotenv/config'

export default {
  "development": {
    "username": "postgres",
    "password": "pass123",
    "database": "store_be",
    "host": "127.0.0.1",
    "dialect": "postgres"

  },
  "test": {
    "username": "root",
    "password": null,
    "database": "store_be_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}

