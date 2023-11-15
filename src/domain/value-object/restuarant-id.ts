import {UUID} from "crypto";

export class RestaurantId{
    id: UUID;
    constructor(id: UUID){
        this.id = id;
    }

}
