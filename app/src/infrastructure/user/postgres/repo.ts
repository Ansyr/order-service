import Pool from "pg-pool";
import {UserRepository} from "../../../application/user/interfaces";
import {User} from "../../../domain/user/entity/user";
import {userInsertQuery} from "./quiries";
import {UUID} from "crypto";


export class UserRepo implements UserRepository {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async saveUser(user: User){
        const client = await this.pool.connect()
        try {
            await client.query('BEGIN')
            const userInsertValues = [user.id.id, user.fullName.firstname, user.fullName.lastname,user.fullName.surname, user.email.email, user.phoneNumber.phoneNumber, user.address.getFullAddress(), user.password.password, user.roles]
            await client.query(userInsertQuery, userInsertValues)

            await client.query('COMMIT')
        }catch (e){
            await client.query('ROLLBACK')
            throw new Error("Ошибка при создании пользователя",e.message)
        }finally {
            client.release()
        }
    }

    deleteUser(id: UUID): void {
    }

    findUser(id: UUID): User {
        return ;
    }

    updateUserInfo(user: User): void {
    }

}
