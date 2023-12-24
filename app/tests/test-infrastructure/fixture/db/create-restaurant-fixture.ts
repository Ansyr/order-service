import {Address} from "../../../../src/domain/value-object/address";
import {RestaurantId} from "../../../../src/domain/value-object/restuarant-id";
import {Restaurant} from "../../../../src/domain/restaurant/entity/restaurant";
import {insertRestaurantQuery} from "../queries";
import {testDbPool} from "../fixtures.test";

export const createRestaurantFixture = async (restaurantId: RestaurantId) : Promise<Restaurant> => {
    const restaurantName = 'Test Restaurant';
    const restaurantAddress = new Address('Test Street', '10', '', 'Test City', 'Test Country');
    const restaurantCuisineType = 'Test Cuisine Type';
    const restaurant = Restaurant.create(restaurantId, restaurantName, restaurantAddress, restaurantCuisineType);
    await testDbPool.query(insertRestaurantQuery, [
        restaurantId.id,
        restaurantName,
        restaurantAddress.getFullAddress(),
        restaurantCuisineType
    ])
    return restaurant
}
