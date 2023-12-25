import {Product} from "../../domain/product/entity/product";

export interface ProductRepository {
    saveProduct(product: Product): void
    deleteProduct(id: string): void
    updateProduct(product: Product): void
    findProduct(id: string): Promise<Product | null>
}
