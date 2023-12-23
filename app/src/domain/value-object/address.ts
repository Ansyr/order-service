
export class Address {
     street: string
     houseNumber: string
     apartmentNumber?: string
     city: string
     country: string

   constructor(country: string, city: string, street: string, houseNumber: string, apartmentNumber?: string){
       this.country = country
       this.city = city
       this.street = street
       this.houseNumber = houseNumber
       this.apartmentNumber = apartmentNumber
   }
   getFullAddress(): string {
       return `${this.country} ${this.city} ${this.street} ${this.houseNumber} ${this.apartmentNumber}`
   }
}
