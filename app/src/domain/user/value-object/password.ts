export class Password{
    password: string;
    constructor(password: string){
        this.password = password
        this.validate();
    }
    private validate(): void {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (passwordRegex.test(this.password)) {
            return;
        } else {
            throw new Error('Неверный пароль');
        }
    }
}
