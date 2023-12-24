import {UserRepository} from "../interfaces";
import {CreateUserCommand} from "./comands";
import {Roles, User} from "../../../domain/user/entity/user";
import {PhoneNumber} from "../../../domain/user/value-object/phone-number";
import {Address} from "../../../domain/value-object/address";
import {Password} from "../../../domain/user/value-object/password";
import {Email} from "../../../domain/user/value-object/email";
import {FullName} from "../../../domain/user/value-object/full-name";
import {UserId} from "../../../domain/value-object/user-id";
import {randomUUID} from "crypto";

export class CreateUser {
    constructor(
        private userRepo: UserRepository
    ) { }
    handle(command: CreateUserCommand) {
        const userId = new UserId(randomUUID())
        const userInfo = new FullName(command.firstName, command.lastName, command.surname)
        const email = new Email(command.email)
        const password = new Password(command.password)
        const address = new Address(command.country, command.city, command.street, command.houseNumber, command.apartmentNumber)
        const phoneNumber = new PhoneNumber(command.phoneNumber)
        const role = Roles.USER
        const user = User.create(userId, userInfo, email, password, address, phoneNumber, role)
        this.userRepo.saveUser(user)
    }   
}
