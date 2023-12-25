import {UUID} from "crypto";

export type CreateProductCommand = {
    name: string
    price: number
    description: string
    restaurantId: UUID
}


export type UpdateProductCommand = {
    productId: string
    name: string
    price: number
    description: string
    restaurantId: string
}

export type DeleteProductCommand = {
    productId: string
}
