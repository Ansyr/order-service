import {Address} from "../../value-object/address";
import {PhoneNumber} from "../value-object/phone-number";
import {Email} from "../value-object/email";
import {Password} from "../value-object/password";
import {FullName} from "../value-object/full-name";
import {UserId} from "../../value-object/user-id";
import {UUID} from "crypto";

export enum Roles{
    ADMIN = 'admin',
    USER = 'user',
    COURIER = 'courier',
}

export class User{
    constructor(
        public  id: UserId,
        public fullName: FullName,
        public email: Email,
        public password: Password,
        public address: Address,
        public phoneNumber: PhoneNumber,
        public roles: Roles,
    ) {
    }
    static create(userId: UserId,userInfo: FullName, email: Email, password: Password, address: Address, phoneNumber: PhoneNumber, role: Roles){
        return new User(userId,userInfo, email, password, address, phoneNumber, role);
    }
    getUUID(): UUID{
        return this.id.id
    }

    changePassword(newPassword: Password){
        this.password = new Password(newPassword.password);
    }

    changeEmail(newEmail: Email){
        this.email = newEmail
    }

    changeAddress(newAddress: Address){
        this.address = newAddress
    }

    changePhoneNumber(newPhoneNumber: PhoneNumber){
        this.phoneNumber = new PhoneNumber(newPhoneNumber.phoneNumber);
    }

    changeRole(newRole: Roles){
        this.roles = newRole
    }
    changeFirstname(newName: string){
        this.fullName.changeFirstname(newName)
    }
    changeLastname(newName: string){
        this.fullName.changeLastname(newName)
    }
    changeSurname(newSurname: string){
        this.fullName.changeSurname(newSurname)
    }
}
