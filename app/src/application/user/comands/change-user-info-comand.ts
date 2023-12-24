import {UserRepository} from "../interfaces";
import {changeUserInfoCommand} from "./comands";

export class ChangeUserInfoCommand{
    constructor(
        private userRepo: UserRepository
    ) {}
    async handle(command: changeUserInfoCommand){
        const user = await this.userRepo.findUser(command.userId)
        user.changeAddress(command.address)
        user.changePhoneNumber(command.phoneNumber)
        user.changeEmail(command.email)
        user.changeFirstname(command.firstname)
        user.changeLastname(command.lastname)
        user.changeSurname(command.surname)
        user.changeRole(command.role)
        user.changePassword(command.password)
        await this.userRepo.updateUserInfo(user)
    }
}
