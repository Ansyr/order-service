import {UserRepo} from "../../../../src/infrastructure/user/postgres/repo";
import {Roles, User} from "../../../../src/domain/user/entity/user";
import {destroyTestData, initializeTestData, testDbPool} from "../../fixture/fixtures.test";
import {UserId} from "../../../../src/domain/value-object/user-id";
import {randomUUID} from "crypto";
import {FullName} from "../../../../src/domain/user/value-object/full-name";
import {Email} from "../../../../src/domain/user/value-object/email";
import {Password} from "../../../../src/domain/user/value-object/password";
import {Address} from "../../../../src/domain/value-object/address";
import {PhoneNumber} from "../../../../src/domain/user/value-object/phone-number";

describe('UserRepo Integration Tests', () => {
    let userRepo: UserRepo;
    let user: User;

    beforeAll( async () => {
       await initializeTestData();
        userRepo = new UserRepo(testDbPool);

        const userId = new UserId(randomUUID());
        const fullName = new FullName('Vautin', 'Sergey', 'Sergeevich');
        const email = new Email('vasutin203@gmail.com');
        const password = new Password('Test@123');
        const address = new Address('Country', 'City', 'Street', 'House', 'Apartment');
        const phoneNumber = new PhoneNumber('1234567890');
        const role = Roles.USER;

        user = User.create(userId, fullName, email, password, address, phoneNumber, role);
    });

    afterAll(async () => {
        await destroyTestData();
    });



    describe('createUser', () => {
        it('should create a new user', async () => {
            await userRepo.saveUser(user);
            const queryResult = await testDbPool.query('SELECT * FROM "user".users WHERE user_id = $1', [user.id.id]);
            const createdUser = queryResult.rows[0];
            expect(createdUser).toBeDefined();
            expect(createdUser.email).toEqual(user.email.email);
        });
    });

});
