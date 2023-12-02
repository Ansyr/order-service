export class FullName{
    firstname: string;
    lastname: string;
    surname?: string;
    constructor(firstName: string, lastName: string, surname: string){
        this.firstname = firstName;
        this.lastname = lastName;
        this.surname = surname;
    }

    changeFirstname(newName: string){
        this.firstname = newName
    }

    changeLastname(newLastName: string){
        this.lastname = newLastName
    }

    changeSurname(newSurname: string){
        this.surname = newSurname
    }
}
