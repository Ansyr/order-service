import {testDbPool} from "../../fixture/test-pool";
import {RestaurantRepo} from "../../../../src/infrastructure/restaurant/postgres/restaurant-repo/restaurant-repo";
import {Restaurant} from "../../../../src/domain/restaurant/entity/restaurant";
import {randomUUID} from "crypto";
import {RestaurantId} from "../../../../src/domain/value-object/restuarant-id";
import {Address} from "../../../../src/domain/value-object/address";
import {UserId} from "../../../../src/domain/value-object/user-id";
import {destroyTestData} from "../../fixture/db/destroy-test-data";


describe("RestaurantRepo Integration Tests", () => {
        let restaurantRepo: RestaurantRepo;
        let restaurant: Restaurant;
        beforeAll(async () => {
            restaurantRepo = new RestaurantRepo(testDbPool);
        })

        beforeEach(() => {
            const restaurantId = new RestaurantId(randomUUID());
            const address = new Address("Country", "City", "Street", "House", "Apartment");
            const ownerId = new UserId(randomUUID());
            restaurant = Restaurant.create(restaurantId, "Name", address,"Cuisine" );
        })

        afterEach(async () => {
            await destroyTestData();
        });

        it('should save a restaurant', async () => {
             await restaurantRepo.saveRestaurant(restaurant);
             const savedRestaurant = await restaurantRepo.findRestaurant(restaurant.id.id);

            if (!savedRestaurant) {
                throw new Error('Restaurant not found');
            }
            expect(savedRestaurant.id).toEqual(restaurant.id.id);
        })

        it('should update a restaurant', async () => {
            await restaurantRepo.saveRestaurant(restaurant);
            restaurant.changeName("New name");
            await restaurantRepo.updateRestaurant(restaurant);
            const updatedRestaurant = await restaurantRepo.findRestaurant(restaurant.id.id);
            if (!updatedRestaurant) {
                throw new Error('Restaurant not found');
            }
            expect(updatedRestaurant.name).toEqual(restaurant.name);
        })

        it('should delete order', async() => {
            await restaurantRepo.deleteRestaurant(restaurant.id.id);
            const deletedRestaurant = await restaurantRepo.findRestaurant(restaurant.id.id);
            expect(deletedRestaurant).toBeNull();
        });

    }
)
