import {Roles} from "../../../domain/user/entity/user";
import {UUID} from "crypto";


export type CreateUserCommand = {
    firstName: string
    lastName: string
    surname: string
    email: string
    password: string
    country: string
    city: string
    street: string
    houseNumber: string
    apartmentNumber: string
    phoneNumber: string
    role: Roles
}

export type changeUserInfoCommand = {
    userId: UUID
    firstname: string
    lastname: string
    surname: string
    phoneNumber: string
    email: string
    country: string
    city: string
    street: string
    houseNumber: string
    apartmentNumber: string
    role: Roles
    password: string
}


export type DeleteUserCommand = {
    id: string
}
