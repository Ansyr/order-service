import {UUID} from "crypto";


export class OrderId{
    id: UUID;
    constructor(id: UUID){
        this.id = id;
    }
}
