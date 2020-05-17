import { Service, Container } from "typedi";

import ClientsDomain from "../../../core/domain/admin/clientsDomain";

@Service()
export default class ClientsController {
    clientsDomain: ClientsDomain;

    constructor() {
        this.clientsDomain = Container.get(ClientsDomain);
    }

    async create(req, res, next) {
        await this.clientsDomain.create(req.query.client);

        res.send('Success!');
    }
}