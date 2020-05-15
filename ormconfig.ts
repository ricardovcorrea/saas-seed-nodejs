module.exports = {
    "type": "mysql",
    "synchronize": false,
    "migrationsRun": true,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB_MAIN_DATABASE,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "entities": [
        "api/model/*.js"
    ],
    "migrations": [
        "database/migration/*.js"
    ],
    "cli": {
        "entitiesDir": "api/model/",
        "migrationsDir": "database/migration"
    }
}