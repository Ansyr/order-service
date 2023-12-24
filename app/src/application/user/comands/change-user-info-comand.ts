import {UserRepository} from "../interfaces";
import {changeUserInfoCommand} from "./comands";
import {Address} from "../../../domain/value-object/address";
import {Password} from "../../../domain/user/value-object/password";
import {Email} from "../../../domain/user/value-object/email";
import {PhoneNumber} from "../../../domain/user/value-object/phone-number";

export class ChangeUserInfoCommand{
    constructor(
        private userRepo: UserRepository
    ) {}
    async handle(command: changeUserInfoCommand){
        const user = await this.userRepo.findUser(command.userId)
        const address = new Address(command.country, command.city, command.street, command.houseNumber, command.apartmentNumber)
        const password = new Password(command.password)
        const phoneNumber = new PhoneNumber(command.phoneNumber)
        const email = new Email(command.email)
        user.changeFirstname(command.firstname)
        user.changeLastname(command.lastname)
        user.changeSurname(command.surname)
        user.changeRole(command.role)
        user.changePhoneNumber(phoneNumber)
        user.changeEmail(email)
        user.changeAddress(address)
        user.changePassword(password)
        this.userRepo.updateUserInfo(user)
    }
}
