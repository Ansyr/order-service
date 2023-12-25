import {CreateProduct} from "../commands/create-product-comand";
import {ProductRepo} from "../../../infrastructure/product/postgres/product-repo/product-repo";
import {DeleteProduct} from "../commands/delete-product-comand";
import {UpdateProduct} from "../commands/update-product-comand";

export class ProductService{
    private readonly productRepo: ProductRepo
    public readonly createProduct: CreateProduct
    public readonly deleteProduct: DeleteProduct
    public readonly updateProduct: UpdateProduct
    constructor(productRepo: ProductRepo){
        this.productRepo = productRepo
        this.createProduct = new CreateProduct(this.productRepo)
        this.deleteProduct = new DeleteProduct(this.productRepo)
        this.updateProduct = new UpdateProduct(this.productRepo)
    }
}
