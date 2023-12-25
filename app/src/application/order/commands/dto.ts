import {UUID} from "crypto";


export type DeleteOrderDTO = {
    orderId: string
}

export type CreatedOrderDTO = {
    orderId: UUID;
}

export type UpdateOrderStatusDTO = {
    orderId: string,
}
