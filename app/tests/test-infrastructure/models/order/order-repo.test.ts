    import Pool from "pg-pool";
    import { Order, OrderStatus } from '../../../../src/domain/order/entity/order';
    import { after } from "node:test";
    import { OrderRepo } from "../../../../src/infrastructure/order/postgres/repo";
    import { RestaurantId } from "../../../../src/domain/value-object/restuarant-id";
    import { Address } from "../../../../src/domain/value-object/address";
    import { Amount } from "../../../../src/domain/value-object/amount";
    import { Price } from "../../../../src/domain/value-object/price";
    import {UserId} from "../../../../src/domain/value-object/user-id";
    import {FullName} from "../../../../src/domain/user/value-object/full-name";
    import {Email} from "../../../../src/domain/user/value-object/email";
    import {Password} from "../../../../src/domain/user/value-object/password";
    import {PhoneNumber} from "../../../../src/domain/user/value-object/phone-number";
    import {Roles, User} from "../../../../src/domain/user/entity/user";
    import {randomUUID} from "crypto";
    import {Restaurant} from "../../../../src/domain/restaurant/entity/restaurant";
    import {OrderId} from "../../../../src/domain/order/value-object/order-id";


    describe('OrderRepo Integration Tests', () => {
        let pool: Pool;
        let orderRepo: OrderRepo;
        let restaurant: Restaurant;
        let user: User
        let order: Order

        beforeAll(async () => {
            pool = new Pool({
                user: 'testpostgres',
                password: 'testroot',
                host: 'localhost',
                port: 12346,
                database: 'order_test',
                max: 20,
                idleTimeoutMillis: 1000,
                connectionTimeoutMillis: 1000,
            });

            await pool.connect();

            orderRepo = new OrderRepo(pool);

            // Создание ресторана
            const restaurantCreationQuery = `INSERT INTO restaurant.restaurant (restaurant_id,name, address, cuisine_type) VALUES ($1, $2, $3, $4);`
            const restaurantName = 'Test Restaurant';
            const restaurantAddress = new Address('Test Street', '10', '', 'Test City', 'Test Country');
            const restaurantCuisineType = 'Test Cuisine Type';
            const restaurantId = new RestaurantId(randomUUID());
            await pool.query(restaurantCreationQuery, [
                restaurantId.id,
                restaurantName,
                restaurantAddress.getFullAddress(),
                restaurantCuisineType
            ]);

            restaurant = Restaurant.create(restaurantId,restaurantName, restaurantAddress);


            // Создание пользователя
            const userCreationQuery = `
                INSERT INTO "user".users (user_id,first_name,last_name,sur_name, email, phone, address, password_hash, role)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
            `;
            const userId = new UserId(randomUUID());
            const fullName = new FullName('Vasutin', 'Sergey', 'Sergeevich')
            const email = new Email('vasutin2003@gmail.com')
            const password = new Password("Test@123")
            const address = new Address('Country', 'City', 'Street', 'House', 'Apartment')
            const phoneNumber = new PhoneNumber('1234567890')
            const role = Roles.USER

            user = User.create(userId, fullName, email, password, address, phoneNumber, role)

            await pool.query(userCreationQuery, [
                user.id.id,
                user.fullName.firstname,
                user.fullName.lastname,
                user.fullName.surname,
                user.email.email,
                user.phoneNumber.phoneNumber,
                user.address.getFullAddress(),
                user.password.password,
                user.roles
            ]);


            const orderId = new OrderId(randomUUID())
            const dateTime = new Date();
            const totalPrice = new Price(100.00);
            const status = OrderStatus.Created;
            const amount = new Amount(2);
            const deliveryAddress = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
            order = Order.create(orderId, user.id, dateTime, totalPrice, status, amount, deliveryAddress, restaurant.id, [
                {
                    id: 1,
                    price: 30,
                },
                {
                    id: 1,
                    price: 30
                }
            ])
        });

        after(async () => {
            await pool.end();
        });

        afterEach(async () => {
        //     await pool.query(`TRUNCATE TABLE
        // "user".users,
        // restaurant.restaurant,
        //  review.review,
        //  "order".order,
        //  order_detail.order_detail,
        //  product.product,
        //  product_category.product_category,
        //  product_category_mapping.product_category_mapping,
        //  delivery.delivery
        //  RESTART IDENTITY;`);
        });

        describe('saveOrder', () => {
            it('should save an order to the database', async () => {
                console.log(order)

                await orderRepo.saveOrder(order);
                // const res = await pool.query('SELECT * FROM "order".order WHERE order_id = $1', [order.id]);
                // expect(res.rows[0].user_id).toEqual(order.userId.id); // Изменен способ сравнения
            });
        });

        describe("findOrder",() => {
            it("should return order from database", async () => {
                const findOrder = await orderRepo.findOrder(order.id.id);
                if (findOrder) {
                    findOrder.changeStatus(OrderStatus.Pending);
                    await orderRepo.updateOrderStatus(findOrder);
                } else {
                    throw new Error("Order not found");
                }
                expect(findOrder).toBeDefined();
            })
        })

        describe("updateOrderStatus",() => {
            it("should update order status", async () => {
                const findOrder = await orderRepo.findOrder(order.id.id);

                if (findOrder) {
                    findOrder.changeStatus(OrderStatus.Pending);
                    await orderRepo.updateOrderStatus(findOrder);
                } else {
                    throw new Error("Order not found");
                }
            });
        })
        describe('deleteOrder', () => {
            it('should delete an order from the database', async () => {

                await orderRepo.saveOrder(order);
                await orderRepo.deleteOrder(order.id.id);
                const res = await pool.query('SELECT * FROM "order".order WHERE order_id = $1', [order.id]);


                expect(res.rows.length).toBe(0);
            });
        });
    });
