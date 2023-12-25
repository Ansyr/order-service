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
        if (!user) {
            throw new Error('User not found')
        }
        if(command.firstname){
            user.changeFirstname(command.firstname)
        }
        if (command.lastname) {
            user.changeLastname(command.lastname)
        }
        if (command.surname) {
            user.changeSurname(command.surname)
        }
        if (command.role) {
            user.changeRole(command.role)
        }
       if (command.password) {
           const password = new Password(command.password)
           user.changePassword(password)
       }
       if(command.city && command.country && command.street && command.houseNumber){
           const address = new Address(command.country, command.city, command.street, command.houseNumber, command.apartmentNumber)
           user.changeAddress(address)
       }
       if(command.phoneNumber){
           const phoneNumber = new PhoneNumber(command.phoneNumber)
           user.changePhoneNumber(phoneNumber)
       }
      if (command.email){
          const email = new Email(command.email)
          user.changeEmail(email)
      }

        this.userRepo.updateUserInfo(user)
    }
}
