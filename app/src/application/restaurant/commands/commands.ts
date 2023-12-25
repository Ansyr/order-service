
export type CreateRestaurantCommand = {
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
