
import {Product} from "./entity/product";
import {ProductId} from "../value-object/product-id";
import {RestaurantId} from "../value-object/restuarant-id";
import {Price} from "../value-object/price";


describe('Product', () => {
    const productId: ProductId = new ProductId(1);
    const restaurantId: RestaurantId = new RestaurantId(1);
    const productName = 'Test Product';
    const productPrice: Price = new Price(100);
    const productDescription = 'Test Description';

    let product: Product;


    beforeEach(() => {
        product =  Product.create(productId, productName, productPrice, productDescription, restaurantId);
    });

    it('should create a new product instance', () => {
        expect(product.id).toEqual(productId);
        expect(product.name).toEqual(productName);
        expect(product.price).toEqual(productPrice);
        expect(product.description).toEqual(productDescription);
        expect(product.restaurantId).toEqual(restaurantId);
    });

    it('should update product name', () => {
        const newName = 'Updated Product Name';
        product.updateName(newName);
        expect(product.name).toEqual(newName);
    });

    it('should update product price', () => {
        const newPrice = new Price(20);
        product.updatePrice(newPrice);
        expect(product.price).toEqual(newPrice);
    });

    it('should update restaurant id', () => {
        const newRestaurantId: RestaurantId = new RestaurantId(2);
        product.updateRestaurantId(newRestaurantId);
        expect(product.restaurantId).toEqual(newRestaurantId);
    });
    it('should update product description', function () {
        const newDescription = 'Updated Description';
        product.updateDescription(newDescription);
        expect(product.description).toEqual(newDescription);
    });
    it('should update incorrect price', function () {
        const t = () => {
            const price = new Price(100001);
            product.updatePrice(price);
        }
        expect(t).toThrowError('Цена продукта не может быть больше 1000000')
    });

});
