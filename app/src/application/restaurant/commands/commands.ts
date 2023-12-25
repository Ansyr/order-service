import {UUID} from "crypto";

export type CreateRestaurantCommand = {
    restaurantId: UUID
    name: string
    description: string
    city: string
    country: string
    street: string
    houseNumber: string
    apartmentNumber: string
    cuisineType: string
}

export type UpdateRestaurantCommand = {
    restaurantId: string
    name: string
    description: string
    city: string
    country: string
    street: string
    houseNumber: string
    apartmentNumber: string
    cuisineType: string
}


export type DeleteRestaurantCommand = {
    restaurantId: string
}
