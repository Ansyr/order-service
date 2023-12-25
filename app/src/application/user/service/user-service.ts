import {UserRepo} from "../../../infrastructure/user/postgres/repo";
import {DeleteUser} from "../comands/delete-user-comand";
import {CreateUser} from "../comands/create-user-comand";

export class UserService {
    private readonly userRepo: UserRepo
    public userCreate: CreateUser
    public userDelete: DeleteUser
    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo
        this.userCreate = new CreateUser(this.userRepo)
        this.userDelete = new DeleteUser(this.userRepo)
    }
}
