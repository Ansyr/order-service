export class Rating {
    value: number;
    constructor(value: number){
        if(value < 0 || value > 10){
            throw new Error('Неверный рейтинг')
        }
        this.value = value;
    }

}
