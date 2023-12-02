export class PhoneNumber{
    phoneNumber: string;
    constructor(phoneNumber: string){
        this.phoneNumber = phoneNumber
        this.validate();
    }
    private validate(): void{
        if (this.phoneNumber.length < 10 || this.phoneNumber.length > 15){
            throw new Error('Неверный номер телефона')
        }
    }
}
