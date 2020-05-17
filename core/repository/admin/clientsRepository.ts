import { Service } from "typedi";

import DatabaseManager from '../../../database/databaseManager';

@Service()
export default class ClientsRepository {

    constructor(private databaseManager: DatabaseManager) {}

    async create(name: string) {
        await this.databaseManager.getClientConnection(name);
    }
}