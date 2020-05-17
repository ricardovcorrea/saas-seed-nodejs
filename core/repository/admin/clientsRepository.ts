import { Service } from "typedi";

import DatabaseManager from '../../../database/connection';

@Service()
export default class ClientsRepository {

    constructor(private databaseManager: DatabaseManager) {}

    async create(name: string) {
        await this.databaseManager.getClientConnection(name);
    }
}