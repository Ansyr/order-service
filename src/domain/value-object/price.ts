export class Price {
    price: number

    constructor(price: number) {
        if (price > 0){
            this.price = price
        }else{
            throw new Error('Цена продукта не может быть больше 0')
        }
    }

    isGreaterThan(otherPrice: number): boolean{
        return this.price > otherPrice
    }
}
