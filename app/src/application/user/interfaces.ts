import {UUID} from "crypto";
import {User} from "../../domain/user/entity/user";

export interface UserRepository {
    deleteUser(id: UUID): void

    findUser(id: UUID): User

    updateUserInfo(user: User): void

    saveUser(user: User): void
}
