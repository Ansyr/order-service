import { UserRepo } from "../../../../src/infrastructure/user/postgres/repo";
import { Roles, User } from "../../../../src/domain/user/entity/user";
import { testDbPool } from "../../fixture/test-pool";
import { UserId } from "../../../../src/domain/value-object/user-id";
import { randomUUID } from "crypto";
import { FullName } from "../../../../src/domain/user/value-object/full-name";
import { Email } from "../../../../src/domain/user/value-object/email";
import { Password } from "../../../../src/domain/user/value-object/password";
import { Address } from "../../../../src/domain/value-object/address";
import { PhoneNumber } from "../../../../src/domain/user/value-object/phone-number";
import { findUserById } from "../../fixture/queries";
import { destroyTestData } from "../../fixture/db/destroy-test-data";
import { after } from "node:test";

describe('UserRepo Integration Tests', () => {
    let userRepo: UserRepo;
    let user: User;
    beforeAll(async () => {
        userRepo = new UserRepo(testDbPool);
    });

    beforeEach(() => {
        const userId = new UserId(randomUUID());
        const fullName = new FullName('Vautin', 'Sergey', 'Sergeevich');
        const email = new Email('vasutin203@gmail.com');
        const password = new Password('Test@123');
        const address = new Address('Country', 'City', 'Street', 'House', 'Apartment');
        const phoneNumber = new PhoneNumber('1234567890');
        const role = Roles.USER;

        user = User.create(userId, fullName, email, password, address, phoneNumber, role);
    });

    afterEach(async () => {
        await destroyTestData();
    });



    describe('createUser', () => {
        it('should create a new user', async () => {
            await userRepo.saveUser(user);
            const queryResult = await testDbPool.query(findUserById, [user.id.id]);
            const createdUser = queryResult.rows[0];
            expect(createdUser).toBeDefined();
            expect(createdUser.email).toEqual(user.email.email);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            await userRepo.deleteUser(user.id.id);
            const queryResult = await testDbPool.query(findUserById, [user.id.id]);
            expect(queryResult.rows.length).toBe(0);
        });
    });

    describe('find user', () => {
        it('should find a user', async () => {
            await userRepo.saveUser(user);
            const foundUser = await userRepo.findUser(user.id.id);
            expect(foundUser).toBeDefined();
            expect(foundUser.email).toEqual(user.email.email);
        });
    });

    describe('update user', () => {
        it('should update a user', async () => {
            await userRepo.saveUser(user);
            user.changeEmail(new Email('vasutin203@gmail.com'));
            await userRepo.updateUserInfo(user);

            const updatedUser = await userRepo.findUser(user.id.id);
            expect(updatedUser).toBeDefined();
            expect(updatedUser.email).toEqual(user.email.email);
        });
    })

});
