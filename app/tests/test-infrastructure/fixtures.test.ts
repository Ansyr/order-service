import {randomUUID} from "crypto";
import {UserId} from "../../src/domain/value-object/user-id";
import {FullName} from "../../src/domain/user/value-object/full-name";
import {Email} from "../../src/domain/user/value-object/email";
import {Password} from "../../src/domain/user/value-object/password";
import {Address} from "../../src/domain/value-object/address";
import {PhoneNumber} from "../../src/domain/user/value-object/phone-number";
import {Roles} from "../../src/domain/user/entity/user";
import {RestaurantId} from "../../src/domain/value-object/restuarant-id";
import Pool from "pg-pool";
import {insertRestaurantQuery, insertUserQuery} from "./queries";


export const testDbPool = new Pool({
    user: 'testpostgres',
    password: 'testroot',
    host: 'localhost',
    port: 12346,
    database: 'order_test',
    max: 20,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000,
});

export const initializeTestData = async () => {
    await testDbPool.connect();

    // Создание ресторана
    const restaurantName = 'Test Restaurant';
    const restaurantAddress = new Address('Test Street', '10', '', 'Test City', 'Test Country');
    const restaurantCuisineType = 'Test Cuisine Type';
    const restaurantId = new RestaurantId(randomUUID());
    await testDbPool.query(insertRestaurantQuery, [
        restaurantId.id,
        restaurantName,
        restaurantAddress.getFullAddress(),
        restaurantCuisineType
    ]);

    // Создание пользователя
    const userId = new UserId(randomUUID());
    const fullName = new FullName('Vasutin', 'Sergey', 'Sergeevich');
    const email = new Email('vasutin2003@gmail.com');
    const password = new Password('Test@123');
    const address = new Address('Country', 'City', 'Street', 'House', 'Apartment');
    const phoneNumber = new PhoneNumber('1234567890');
    const role = Roles.USER;

    await testDbPool.query(insertUserQuery, [
        userId.id,
        fullName.firstname,
        fullName.lastname,
        fullName.surname,
        email.email,
        phoneNumber.phoneNumber,
        address.getFullAddress(),
        password.password,
        role
    ]);


    await testDbPool.end(); // Закрытие пула после завершения
};

beforeAll(async () => {
    await initializeTestData();
});
