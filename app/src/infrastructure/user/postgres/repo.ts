import Pool from "pg-pool";
import { UserRepository } from "../../../application/user/interfaces";
import { User } from "../../../domain/user/entity/user";
import { deleteUserQuery, findUserQuery, updateUserInfoQuery, userInsertQuery } from "./quiries";
import { UUID } from "crypto";
import { FullName } from "../../../domain/user/value-object/full-name";


export class UserRepo implements UserRepository {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async saveUser(user: User) {
        const client = await this.pool.connect()
        try {
            await client.query('BEGIN')
            const userInsertValues = [user.id.id, user.fullName.firstname, user.fullName.lastname, user.fullName.surname, user.email.email, user.phoneNumber.phoneNumber, user.address.getFullAddress(), user.password.password, user.roles]
            await client.query(userInsertQuery, userInsertValues)

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw new Error("Ошибка при создании пользователя", e.message)
        } finally {
            client.release()
        }
    }

    async deleteUser(id: UUID) {
        const client = await this.pool.connect()
        try {
            await client.query('BEGIN')

            await client.query(deleteUserQuery, [id])
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw new Error("Failed to delete user", e)
        } finally {
            client.release()
        }
    }

    async findUser(id: UUID): Promise<User> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(findUserQuery, [id])
            if (res.rows.length === 0) {
                throw new Error('User not found')
            }
            const userFullName = new FullName(res.rows[0].first_name, res.rows[0].last_name, res.rows[0].sur_name)
            return User.create(
                res.rows[0].user_id,
                userFullName,
                res.rows[0].email,
                res.rows[0].phone,
                res.rows[0].address,
                res.rows[0].password_hash,
                res.rows[0].role
            )
        } catch (e) {
            console.error('Failed to find user:', e);
            throw new Error("Failed to find user", e)
        } finally {
            client.release()
        }
    }

    async updateUserInfo(user: User) {
        const client = await this.pool.connect()
        try {
            await client.query('BEGIN')
            await client.query(updateUserInfoQuery, [
                user.id.id,
                user.fullName.firstname,
                user.fullName.lastname,
                user.fullName.surname,
                user.email.email,
                user.phoneNumber.phoneNumber,
                user.address.getFullAddress(),
                user.password.password
            ])
            await client.query('COMMIT')
        } catch (e) {
            console.error('Failed to update user info:', e);
            await client.query('ROLLBACK')
            throw new Error("Failed to update user info", e)
        } finally {
            client.release()
        }
    }

}
