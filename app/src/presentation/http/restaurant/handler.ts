import {CreateRestaurant} from "../../../application/restaurant/commands/create-restaurant";
import {
    CreateRestaurantCommand,
    DeleteRestaurantCommand,
    UpdateRestaurantCommand
} from "../../../application/restaurant/commands/commands";
import {Request, Response} from "express";
import {UpdateRestaurant} from "../../../application/restaurant/commands/update-restaurant";
import {DeleteRestaurant} from "../../../application/restaurant/commands/delete-restaurant";
import {DeleteRestaurantDTO} from "../../../application/restaurant/commands/dto";
export class RestaurantHandler {
    constructor(
        private createRestaurant5: CreateRestaurant,
        private updateRestaurant5: UpdateRestaurant,
        private deleteRestaurant5: DeleteRestaurant
    ) {}

    async createRestaurant(req: Request, res: Response){

        const command : CreateRestaurantCommand = {
            restaurantId: req.body.restaurantId,
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            apartmentNumber: req.body.apartmentNumber,
            cuisineType: req.body.cuisineType
        }

        const result =  this.createRestaurant5.handle(command)
        res.status(201).send(result)
    }

    async updateRestaurant(req: Request, res: Response) {
        const command: UpdateRestaurantCommand = {
            restaurantId: req.params.restaurantId,
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            apartmentNumber: req.body.apartmentNumber,
            cuisineType: req.body.cuisineType
        }
        const result = await this.updateRestaurant5.handle(command)
        res.status(200).send(result)
    }

    async deleteRestaurant(req: Request, res: Response) {
        const command: DeleteRestaurantCommand = {
            restaurantId: req.params.restaurantId
        }
        const result: DeleteRestaurantDTO = await this.deleteRestaurant5.handle(command)
        res.status(200).send(result)
    }
}
