import {Address} from "../../../../src/domain/value-object/address";
import {RestaurantId} from "../../../../src/domain/value-object/restuarant-id";
import {Restaurant} from "../../../../src/domain/restaurant/entity/restaurant";
import {randomUUID} from "crypto";

describe("Restaurant", () => {
    const name = "restaurant";
    const address = new Address("street", "houseNumber", "apartmentNumber", "city", "country");
    const id = new RestaurantId(randomUUID());

    let restaurant: Restaurant;

    beforeEach(() => {
        restaurant = Restaurant.create(id, name, address);
    })

    it("should create a restaurant", () => {
        expect(restaurant.id).toEqual(id);
        expect(restaurant.name).toEqual(name);
        expect(restaurant.address).toEqual(address);
    })
    it('should change name', function () {
        const newName = "newName";
        restaurant.changeName(newName);
        expect(restaurant.name).toEqual(newName);
    });
    it('should change address', function () {
        const newAddress = new Address("newStreet", "newHouseNumber", "newApartmentNumber", "newCity", "newCountry");
        restaurant.changeAddress(newAddress);
        expect(restaurant.address).toEqual(newAddress);
    })

    it('should change cusine type', () => {
        const newCuisineType = "newCuisineType";
        restaurant.changeCuisineType(newCuisineType);
        expect(restaurant.cuisineType).toEqual(newCuisineType);
    });
})
