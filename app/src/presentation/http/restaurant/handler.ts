import {
    CreateRestaurantCommand,
    DeleteRestaurantCommand,
    UpdateRestaurantCommand
} from "../../../application/restaurant/commands/commands";
import {Request, Response} from "express";
import {DeleteRestaurantDTO} from "../../../application/restaurant/commands/dto";
import {RestaurantService} from "../../../application/restaurant/service/restaurant-service";
export class RestaurantHandler {
    constructor(
        private restaurantService: RestaurantService
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

        const result =  this.restaurantService.createRestaurant.handle(command)
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
        const result = await this.restaurantService.updateRestaurant.handle(command)
        res.status(200).send(result)
    }

    async deleteRestaurant(req: Request, res: Response) {
        const command: DeleteRestaurantCommand = {
            restaurantId: req.params.restaurantId
        }
        const result: DeleteRestaurantDTO = await this.restaurantService.deleteRestaurant.handle(command)
        res.status(200).send(result)
    }
}
