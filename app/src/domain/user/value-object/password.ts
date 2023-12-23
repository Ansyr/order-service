
export class Password {
    password: string;

    constructor(password: string) {
        this.password = password;
        this.validate();
    }

    private validate(): void {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(this.password)) {
            throw new Error('Invalid password format');
        }
    }

    // TODO Спросить
    // async hashPassword(): Promise<string> {
    //     const saltRounds = 10;
    //     const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    //     return hashedPassword;
    // }
    //
    // async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    //     return await bcrypt.compare(candidatePassword, hashedPassword);
    // }
}
