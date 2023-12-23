import {describe} from "@jest/globals";
import {Roles, User} from "../../../../src/domain/user/entity/user";
import {Email} from "../../../../src/domain/user/value-object/email";
import {Password} from "../../../../src/domain/user/value-object/password";
import {Address} from "../../../../src/domain/value-object/address";
import {PhoneNumber} from "../../../../src/domain/user/value-object/phone-number";
import {FullName} from "../../../../src/domain/user/value-object/full-name";
import {UserId} from "../../../../src/domain/value-object/user-id";

describe('User', () => {
    const userId = new UserId(1)
    const fullName = new FullName('Vasutin', 'Sergey', 'Sergeevich')
    const email = new Email('vasutin2003@gmail.com')
    const password = new Password("Test@123")
    const address = new Address('Country', 'City', 'Street', 'House', 'Apartment')
    const phoneNumber = new PhoneNumber('1234567890')
    const roles = Roles.USER

    let user: User

    beforeEach(() => {
        user = new User(userId,fullName, email, password, address, phoneNumber, roles)
    })

    it('should create a new user',  () => {
        expect(user.id).toEqual(user.id)
        expect(user.fullName).toEqual(fullName)
        expect(user.email).toEqual(email)
        expect(user.password).toEqual(password)
        expect(user.address).toEqual(address)
        expect(user.phoneNumber).toEqual(phoneNumber)
        expect(user.roles).toEqual(roles)
    })
    it('should change password',  () => {
        const newPassword = new Password("Test@123123123")
        user.changePassword(newPassword)
        expect(user.password).toEqual(newPassword)
    });

    it('should change email',  () => {
        const newEmail = new Email("vasutin2003@gmail.com")
        user.changeEmail(newEmail)
        expect(user.email).toEqual(newEmail)
    });

    it('should change address',  () => {
        const newAddress = new Address('Country', 'City', 'Street', 'House', 'Apartment')
        user.changeAddress(newAddress)
        expect(user.address).toEqual(newAddress)
    });
    it('should change user firstname',  () =>  {
        const newName = 'Vasutin'
        user.changeFirstname(newName)
        expect(user.fullName.firstname).toEqual(newName)
    });
    it('should change user lastname',  () =>  {
        const newName = 'Vasutin'
        user.changeLastname(newName)
        expect(user.fullName.lastname).toEqual(newName)
    })
    it('should change user surname',  () =>  {
        const newName = 'Sergeevich'
        user.changeSurname(newName)
        expect(user.fullName.surname).toEqual(newName)
    })
    it('should change phone number', function () {
        const newPhoneNumber = new PhoneNumber('1234567890')
        user.changePhoneNumber(newPhoneNumber)
        expect(user.phoneNumber).toEqual(newPhoneNumber)
    });
    it('should change roles', function () {
        const newRole = Roles.ADMIN
        user.changeRole(newRole)
        expect(user.roles).toEqual(newRole)
    });


    it('should incorrect password', function () {
        const t = () => {
            const newPassword = new Password("123")
            user.changePassword(newPassword)
        }
        expect(t).toThrowError('Неверный пароль')
    });
})

