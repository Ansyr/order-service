import {UserId} from "../../../../src/domain/value-object/user-id";
import {FullName} from "../../../../src/domain/user/value-object/full-name";
import {Email} from "../../../../src/domain/user/value-object/email";
import {Password} from "../../../../src/domain/user/value-object/password";
import {Address} from "../../../../src/domain/value-object/address";
import {PhoneNumber} from "../../../../src/domain/user/value-object/phone-number";
import {Roles, User} from "../../../../src/domain/user/entity/user";
import {testDbPool} from "../fixtures.test";
import {insertUserQuery} from "../queries";

export const createUserFixture = async (userId: UserId,email: Email) : Promise<User> => {
    const fullName = new FullName('Vasutin', 'Sergey', 'Sergeevich');
    const password = new Password('Test@123');
    const address = new Address('Country', 'City', 'Street', 'House', 'Apartment');
    const phoneNumber = new PhoneNumber('1234567890');
    const role = Roles.USER;

    const user = User.create(userId,fullName, email, password, address, phoneNumber, role);
    await testDbPool.query(insertUserQuery, [
        userId.id,
        fullName.firstname,
        fullName.lastname,
        fullName.surname,
        email.email,
        password.password,
        address.getFullAddress(),
        phoneNumber.phoneNumber,
        role
    ])
    return user
}
