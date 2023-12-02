import {UUID} from "crypto";


export type DeleteOrderDTO = {
    orderId: UUID
}

export type CreatedOrderDTO = {
    orderId: UUID;
}

export type UpdateOrderStatusDTO = {
    orderId: UUID,
}
