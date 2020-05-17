import { Service } from "typedi";
import Logger from '../../helpers/logger';

import ClientsDomain from './admin/clientsDomain';

@Service()
export default class DomainFactory {
    domainsCache = [];

    constructor(private logger: Logger){}

    makeClientsDomain(clientId: number) {
        const cachedDomain = this.domainsCache[clientId];
        if(cachedDomain) {
            return cachedDomain;
        }

        const domain = new ClientsDomain(clientId);
        
        this.domainsCache[clientId] = domain;

        return domain;
    }
}