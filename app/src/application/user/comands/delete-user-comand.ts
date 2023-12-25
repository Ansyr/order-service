import {UserRepository} from "../interfaces";
import {DeleteUserCommand} from "./comands";
import {DeleteUserDTO} from "./dto";

export class DeleteUser{
    constructor(
        public readonly userRepo: UserRepository
    ){}

     async handle(command: DeleteUserCommand): Promise<DeleteUserDTO> {
        await this.userRepo.deleteUser(command.id)
        return {
            userId: command.id
        }
    }
}
