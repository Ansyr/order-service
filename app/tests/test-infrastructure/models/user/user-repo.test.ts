import {after} from "node:test";
import {UserRepo} from "../../../../src/infrastructure/user/postgres/repo";
import {Roles, User} from "../../../../src/domain/user/entity/user";
import {initializeTestData, testDbPool} from "../../fixtures.test";
import {UserId} from "../../../../src/domain/value-object/user-id";
import {randomUUID} from "crypto";
import {FullName} from "../../../../src/domain/user/value-object/full-name";
import {Email} from "../../../../src/domain/user/value-object/email";
import {Password} from "../../../../src/domain/user/value-object/password";
import {Address} from "../../../../src/domain/value-object/address";
import {PhoneNumber} from "../../../../src/domain/user/value-object/phone-number";

describe('UserRepo Integration Tests', () => {
    let userRepo = new UserRepo(testDbPool);
    let user: User

    beforeAll(async () => {
        await initializeTestData();
    });

    after(async () => {
        await testDbPool.end();
    });
    afterEach(async () => {
        await testDbPool.query(`TRUNCATE TABLE 
        "user".users, 
        restaurant.restaurant,
         review.review, 
         "order".order, 
         order_detail.order_detail, 
         product.product, 
         product_category.product_category, 
         product_category_mapping.product_category_mapping, 
         delivery.delivery 
         RESTART IDENTITY;`);
    });
    const userId = new UserId(randomUUID());
    const fullName = new FullName('Vautin', 'Sergey', 'Sergeevich');
    const email = new Email('vasutin203@gmail.com');
    const password = new Password('Test@123');
    const address = new Address('Country', 'City', 'Street', 'House', 'Apartment');
    const phoneNumber = new PhoneNumber('1234567890');
    const role = Roles.USER;

    user = User.create(userId, fullName, email, password, address, phoneNumber, role);

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
