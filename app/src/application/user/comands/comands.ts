import {Roles} from "../../../domain/user/entity/user";
import {UUID} from "crypto";
import {Email} from "../../../domain/user/value-object/email";
import {PhoneNumber} from "../../../domain/user/value-object/phone-number";
import {Address} from "../../../domain/value-object/address";
import {Password} from "../../../domain/user/value-object/password";

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
    phoneNumber: PhoneNumber
    email: Email
    address: Address
    role: Roles
    password: Password
}


export type DeleteUserCommand = {
    id: UUID
}
