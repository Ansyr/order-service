import {CreateUser} from "../../../application/user/comands/create-user-comand";
import {Request, Response} from "express";
import {CreateUserCommand} from "../../../application/user/comands/comands";
export class UserHandler {
    constructor(
        private createUser5: CreateUser
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
        this.createUser5.handle(command)
        res.status(201).send()
    }
}
