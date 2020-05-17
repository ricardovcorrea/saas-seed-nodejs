import "reflect-metadata";
import { Service } from "typedi";

import { ConnectionManager, Connection } from 'typeorm';

@Service()
export default class DatabaseManager {
    connectionManager: ConnectionManager;

    constructor() {
        this.connectionManager = new ConnectionManager();
    }

    async getCoreConnection(): Promise<Connection> {
        if (this.connectionManager.has('core')) {
            return this.connectionManager.get('core');
        }

        return await this.createConnection('core', process.env.DB_MAIN_DATABASE, 'database/migration/core/*.ts', 'core/model/*.ts');
    }

    async getClientConnection(clientSlug: string): Promise<Connection> {
        if (this.connectionManager.has(clientSlug)) {
            return this.connectionManager.get(clientSlug);
        }

        return await this.createConnection(clientSlug, `${process.env.DB_MAIN_DATABASE}_${clientSlug}`, 'database/migration/client/*.ts', 'core/model/*.ts');
    }

    async createConnection(name: string, databaseName: string, migrations: string, entities: string): Promise<any> {
        await this.createDatabase(databaseName);

        const connection = this.connectionManager.create({
            name: name,
            type: "mysql",
            host: process.env.DB_HOST,
            port: Number.parseInt(process.env.DB_PORT),
            database: databaseName,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            migrations: [migrations],
            entities: [entities]
        });

        await connection.connect();

        if (migrations) {
            connection.runMigrations();
        }

        return connection;
    }

    async createDatabase(databaseName: string): Promise<any> {
        let connectionManager = new ConnectionManager();

        const connection = connectionManager.create({
            type: "mysql",
            host: process.env.DB_HOST,
            port: Number.parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        await connection.connect();

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

        await connection.close();

        connectionManager = null;
    }

}