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
        "core/model/*.ts"
    ],
    "migrations": [
        "database/migration/main/*.ts"
    ],
    "cli": {
        "entitiesDir": "code/model/",
        "migrationsDir": "database/migration/main"
    }
}