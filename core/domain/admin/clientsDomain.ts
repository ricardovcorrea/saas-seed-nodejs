import { Service } from "typedi";
import ClientsRepository from '../../repository/admin/clientsRepository';

@Service()
export default class ClientsDomain {
    constructor(private clientsRepository: ClientsRepository) {
        
    }

    async create(name: string) {
        await this.clientsRepository.create(name);
    }
}