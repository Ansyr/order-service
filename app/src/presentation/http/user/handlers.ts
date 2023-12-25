
import {Request, Response} from "express";
import {CreateUserCommand, DeleteUserCommand} from "../../../application/user/comands/comands";
import {UserService} from "../../../application/user/service/user-service";
export class UserHandler {
    constructor(
        private userService: UserService
    ) {}
    createUser(req: Request, res: Response){
        const command: CreateUserCommand = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            apartmentNumber: req.body.apartmentNumber,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
        }
        this.userService.userCreate.handle(command)
        res.status(201).send()
    }

   async deleteUser(req: Request, res: Response) {
        const command: DeleteUserCommand = {
            id: req.params.id
        }
        await this.userService.userDelete.handle(command)
        res.status(200).send()
    }
}
